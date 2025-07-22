// [build] library: 'shadcn'
import { Loader2, Mail } from "lucide-react"
import { Button } from "../components/ui/button"
import PulseLoader from "../components/PulseLoader"

const meta = {
  title: "ui/Button",
  component: Button,
  argTypes: {},
}

export default meta

export const Base = {
  render: (args: any) => <Button {...args}>Button</Button>,
  args: {},
}

export const Outline = {
  render: (args: any) => <Button {...args}>Button</Button>,
  args: {
    variant: "outline",
  },
}

export const Ghost = {
  render: (args: any) => <Button {...args}>Button</Button>,
  args: {
    variant: "ghost",
  },
}

export const Secondary = {
  render: (args: any) => <Button {...args}>Button</Button>,
  args: {
    variant: "secondary",
  },
}

export const Link = {
  render: (args: any) => <Button {...args}>Button</Button>,
  args: {
    variant: "link",
  },
}

export const Loading = {
  render: (args: any) => (
    <Button {...args}>
      <PulseLoader size="small" />
      Button
    </Button>
  ),
  args: {
    variant: "outline",
  },
}

export const WithIcon = {
  render: (args: any) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    variant: "secondary",
  },
}
