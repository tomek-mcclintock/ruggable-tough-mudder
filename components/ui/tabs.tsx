
import { useState, Children, cloneElement } from 'react';

export function Tabs({ children, defaultValue, className }: any) {
  const [active, setActive] = useState(defaultValue);

  const tabList = Children.toArray(children).find(
    (child: any) => child.props.__TYPE === 'TabsList'
  );

  const tabContent = Children.toArray(children).filter(
    (child: any) => child.props.__TYPE === 'TabsContent' && child.props.value === active
  );

  return (
    <div className={className}>
      {cloneElement(tabList as any, { active, setActive })}
      {tabContent}
    </div>
  );
}

export function TabsList({ children, active, setActive, className }: any) {
  return (
    <div className={className}>
      {Children.map(children, (child: any) =>
        cloneElement(child, {
          isActive: child.props.value === active,
          onClick: () => setActive(child.props.value)
        })
      )}
    </div>
  );
}
TabsList.defaultProps = { __TYPE: 'TabsList' };

export function TabsTrigger({ value, children, onClick, isActive }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-semibold ${
        isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: any) {
  return <div>{children}</div>;
}
TabsContent.defaultProps = { __TYPE: 'TabsContent' };
