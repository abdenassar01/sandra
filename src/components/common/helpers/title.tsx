import { ReactNode } from "react";

export type TitleProps = {
  title: string
  icon: ReactNode
}

export function Title({ title, icon }: TitleProps) {
  return (
    <div>
      <div className="">{title}</div>
      {icon}
    </div>
  )
}