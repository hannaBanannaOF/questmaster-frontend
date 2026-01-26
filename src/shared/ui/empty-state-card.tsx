import { alpha, Box } from "@mantine/core"
import { ReactNode } from "react"

export function EmptyStateCard({ children } : { children?: ReactNode }) {
  return <Box
    p="lg"
    bdrs={8}
    style={(theme) => ({
      border: `1px solid ${alpha(theme.colors.questmaster[5], 0.3)}`,
      boxShadow: `
        inset 0 0 0 1px ${theme.colors.dark[5]},
        inset 0 2px 6px rgba(0, 0, 0, 0.4)
      `,
    })}
  >
    {children}
  </Box>
}