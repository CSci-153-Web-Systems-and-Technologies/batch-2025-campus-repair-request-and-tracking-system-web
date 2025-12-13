'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Message = {
    id: string;
    request_id: string;
    sender_id: string;
    sender_role: 'requester' | 'personnel';
    text: string;
    created_at: string;
};

interface CommunicationUpdatesProps {
    requestId: string;
    role: 'requester' | 'personnel';
}

const CommunicationUpdates: React.FC<CommunicationUpdatesProps> = ({ requestId, role }) => {
    const supabase = createClient();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState('');
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setCurrentUserId(user.id);

            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('request_id', requestId)
                .order('created_at', { ascending: true });
            if (error) {
                console.error('load messages error', error);
                setErrorMsg('Could not load messages.');
            }
            if (data) setMessages(data as Message[]);
        };
        load();
    }, [requestId, supabase]);

    useEffect(() => {
        const channel = supabase
            .channel(`messages:${requestId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `request_id=eq.${requestId}`,
            }, (payload) => {
                const newMsg = payload.new as Message;
                setMessages((prev) => {
                    if (prev.find((m) => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [requestId, supabase]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        if (!currentUserId) {
            setErrorMsg('You must be signed in to send messages.');
            return;
        }
        setSending(true);
        setErrorMsg('');
        const text = input.trim();
        setInput('');
        const { error } = await supabase.from('messages').insert({
            request_id: requestId,
            sender_id: currentUserId,
            sender_role: role,
            text,
        });
        if (error) {
            console.error('send message error', error);
            setErrorMsg(error.message || 'Send failed. Please try again.');
            setInput(text); // restore text for retry
        }
        setSending(false);
    };

    const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="w-full max-w-[788px] min-h-[192px] relative">
            <div className="w-full h-full bg-neutral-100 rounded-2xl border border-lime-950 p-6">
                <div className="font-electrolize text-lime-950 text-base font-semibold leading-9 tracking-wide">Communication and Updates</div>
                <div className="text-lime-950 text-base leading-9 tracking-wide">Track progress updates and communicate</div>

                <div ref={listRef} className="mt-4 max-h-64 overflow-y-auto pr-1 space-y-3">
                    {messages.map((msg) => {
                        const isSelf = msg.sender_id === currentUserId;
                        const align = isSelf ? 'items-end text-right' : 'items-start text-left';
                        const bubble = isSelf ? 'bg-lime-900 text-white' : 'bg-white text-lime-950';
                        return (
                            <div key={msg.id} className={`flex flex-col ${align}`}>
                                <div className={`inline-block px-3 py-2 rounded-xl border border-lime-950 ${bubble}`}>
                                    <div className="text-xs font-semibold capitalize">{msg.sender_role}</div>
                                    <div className="text-sm whitespace-pre-wrap break-words">{msg.text}</div>
                                </div>
                                <span className="text-[10px] text-stone-500 mt-1">{formatTime(msg.created_at)}</span>
                            </div>
                        );
                    })}
                    {messages.length === 0 && (
                        <div className="text-xs text-stone-500">No messages yet.</div>
                    )}
                </div>

                <div className="mt-4 flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 h-11 bg-zinc-300 rounded-lg px-3 text-lime-950 text-sm placeholder:text-lime-950 placeholder:opacity-60 focus:outline-none"
                        disabled={sending}
                    />
                    <div className="flex items-center">
                        <button
                            onClick={handleSend}
                            disabled={sending || !currentUserId}
                            className="w-20 h-8 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black/95 bg-white flex items-center justify-center hover:bg-gray-100 disabled:opacity-60"
                        >
                            <span className="text-lime-950 text-xs font-medium tracking-wider">SEND</span>
                        </button>
                    </div>
                </div>
                {errorMsg && <div className="mt-2 text-xs text-red-600">{errorMsg}</div>}
            </div>
        </div>
    );
};

export default CommunicationUpdates;