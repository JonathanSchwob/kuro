import { useState } from "react";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
}

export default function EditableText({ text, onSave }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const save = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) onSave(trimmed);
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") {
          setEditText(text);
          setIsEditing(false);
        }
      }}
      autoFocus
      onFocus={(e) => e.target.select()}
      className="w-full px-2 py-1 rounded focus:outline-none"
    />
  ) : (
    <span className="truncate" onDoubleClick={() => setIsEditing(true)}>
      {text}
    </span>
  );
}
