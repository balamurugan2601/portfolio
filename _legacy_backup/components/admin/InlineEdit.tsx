'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InlineEditProps {
    initialValue: string;
    onSave: (value: string) => Promise<void>;
    type?: 'text' | 'textarea';
    className?: string;
    isEditable: boolean;
}

export default function InlineEdit({
    initialValue,
    onSave,
    type = 'text',
    className = '',
    isEditable
}: InlineEditProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [saving, setSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const router = useRouter();

    // If initialValue changes (e.g. from server refresh), update local state
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    if (!isEditable) {
        return <span className={className}>{value}</span>;
    }

    const handleSubmit = async () => {
        if (value === initialValue) {
            setIsEditing(false);
            return;
        }

        setSaving(true);
        try {
            await onSave(value);
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error('Failed to save inline edit', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setValue(initialValue);
        }
    };

    if (isEditing) {
        return (
            <div className="relative inline-block w-full max-w-full">
                {type === 'textarea' ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-black/50 border border-purple-500 rounded px-2 py-1 outline-none text-white ${className}`}
                        rows={3}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-black/50 border border-purple-500 rounded px-2 py-1 outline-none text-white ${className}`}
                    />
                )}
                {saving && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={`cursor-pointer hover:bg-white/10 rounded px-1 transition-colors border border-transparent hover:border-white/20 relative group ${className}`}
            title="Click to edit"
        >
            {value}
            <span className="absolute -top-4 right-0 text-[10px] text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-1 rounded pointer-events-none">
                Edit
            </span>
        </span>
    );
}
