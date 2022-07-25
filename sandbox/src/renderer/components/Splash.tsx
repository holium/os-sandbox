import { Spinner, Flex } from './';

export const Splash = () => {
  return (
    <Flex
      background="bg.secondary"
      flex={1}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner size={4} />
    </Flex>
  );
};
