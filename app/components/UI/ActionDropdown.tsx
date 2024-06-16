import React from 'react';

const ActionDropdown = (props: {
  children: React.ReactNode;
  isVisible?: boolean;
}) => {
  return props.isVisible ? (
    <div className="absolute top-full transition-transform transform-gpu translate-y-3 bg-dark-gray flex flex-col gap-2 p-2 rounded-md">
      {props.children}
    </div>
  ) : (
    <></>
  );
};

export default ActionDropdown;
