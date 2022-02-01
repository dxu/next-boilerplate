import { Flex, CSSObject } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

function StickyHeader({}: PropsWithChildren<{}>) {
  return <Flex sx={styles.sticky}></Flex>;
}

const styles = {
  sticky: {
    top: 0,
    left: 0,
    position: "fixed",
    right: 0,

    boxShadow: "rgb(0 0 0 / 8%) 0px 1px 12px !important",
    height: {
      sm: "44px",
      md: "80px",
    },
  },
};

export default StickyHeader;
