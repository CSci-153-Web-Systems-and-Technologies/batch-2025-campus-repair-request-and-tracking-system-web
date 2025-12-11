'use client';

import React, { useState } from 'react';

const CommunicationUpdates: React.FC = () => {
    const [note, setNote] = useState('');

    return (
        <div className="w-full max-w-[788px] min-h-[192px] relative">
        <div className="w-full h-full bg-neutral-100 rounded-2xl border border-lime-950 p-6">
        <div className="font-electrolize text-lime-950 text-base font-semibold leading-9 tracking-wide">Communication and Updates</div>
        <div className="text-lime-950 text-base leading-9 tracking-wide" style={{marginTop: 'px'}}>Track progress updates and communicate</div>
        <div className="mt-6">
            <label className="text-lime-950 text-sm font-semibold leading-9 tracking-wide mb-1">Add Note</label>
            <div className="flex gap-3 ">
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Type your note here..."
                    className="flex-1 h-11 bg-zinc-300 rounded-lg px-3 text-lime-950 text-sm placeholder:text-lime-950 placeholder:opacity-60 focus:outline-none"
                />
                <div className="flex items-center">
                <button className="w-20 h-8 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black/95 bg-white flex items-center justify-center hover:bg-gray-100">
                    <span className="text-lime-950 text-xs font-medium tracking-wider">SEND</span>
                </button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default CommunicationUpdates;