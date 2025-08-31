export default function Button({children}:Readonly<{children:React.ReactNode;}>) {
    return (
        <button className="focus">
              <svg className="svg" viewBox="0 0 100 32">
                <polyline points="99,1 99,31 1,31 1,1 99,1" />
                <polyline points="99,1 99,31 1,31 1,1 99,1" />
              </svg>
              <span className="focus-span">{children}</span>
        </button>
    )
}