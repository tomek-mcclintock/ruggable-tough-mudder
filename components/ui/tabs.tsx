
import { useState } from 'react';

export function Tabs({ children, defaultValue, className }: any) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={className}>
      {children.map((child: any) =>
        child.type.name === 'TabsList'
          ? { ...child, props: { ...child.props, active, setActive } }
          : active === child.props.value
          ? child
          : null
      )}
    </div>
  );
}

export function TabsList({ children, active, setActive, className }: any) {
  return (
    <div className={className}>
      {children.map((child: any) =>
        <button
          key={child.props.value}
          className={`px-4 py-2 rounded-full font-semibold ${active === child.props.value ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActive(child.props.value)}
        >
          {child.props.children}
        </button>
      )}
    </div>
  );
}

export function TabsTrigger({ value, children }: any) {
  return <>{children}</>;
}

export function TabsContent({ value, children }: any) {
  return <div>{children}</div>;
}
