import React, { useRef, useState } from 'react';

const Index: React.FC<any> = () => {
  const [value, setvalue] = useState('');
  return (
    <div>
      homepage
      <input
        value={value}
        onChange={(value) => setvalue(value.target.value)}
      ></input>
    </div>
  );
};

export default Index;
