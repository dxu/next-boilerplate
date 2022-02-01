import { Flex, CSSObject } from "@chakra-ui/react";
import React, { PropsWithChildren, forwardRef } from "react";

function StickyHeader({ children }: React.PropsWithChildren<{}>) {
  return <Flex sx={styles.sticky}>{children}</Flex>;
}

const styles = {
  sticky: {
    top: 0,
    left: 0,
    position: "fixed",
    right: 0,
  },
};

export default StickyHeader;
