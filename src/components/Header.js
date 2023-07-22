import React from 'react'

export default function Header(props) {
  return (
    <header className="main-header">
        <h1 className="header-title">{props.children}</h1>
    </header>
  )
}
