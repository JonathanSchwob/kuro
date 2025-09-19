import { useState, KeyboardEvent, FocusEvent } from "react";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
}

export default function EditableText({ text, onSave }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) onSave(trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") {
      setEditText(text);
      setIsEditing(false);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    saveEdit();
  };

  return isEditing ? (
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
      className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  ) : (
    <span
      className="truncate"
      title={text}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {text}
    </span>
  );
}
