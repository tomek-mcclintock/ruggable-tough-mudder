
export function Checkbox({ checked, onCheckedChange }: any) {
  return (
    <input
      type="checkbox"
      className="w-5 h-5 accent-indigo-600"
      checked={checked}
      onChange={onCheckedChange}
    />
  );
}
