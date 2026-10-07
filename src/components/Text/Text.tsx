import React from 'react'

type Props ={
    varient?: string; //update later
    children: React.ReactNode;
    style?: React.CSSProperties
}

export const Text: React.FC<Props> = ({ varient, children, style }) => {
    if (varient === 'h1') return <h1>{children}</h1>
    if (varient === 'h2') return <h2>{children}</h2>
    if (varient === 'p') return <p>{children}</p>
    if (varient === 'span') return <span>{ children}</span>
  return (
    <div style={style}>
          { children}
    </div>
  )
}


