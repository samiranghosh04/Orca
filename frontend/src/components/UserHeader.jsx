import { VStack, Box, Flex, Text, Link } from "@chakra-ui/layout"
import { FaGithub } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { Avatar} from "@chakra-ui/avatar"
import { Menu, MenuButton, MenuList, MenuItem, Portal, useToast } from '@chakra-ui/react'

const UserHeader = () => {
  const toast = useToast();
  const copyLink = () => {
    const currentURL = window.location.href;
    console.log(window);
    navigator.clipboard.writeText(currentURL).then(() =>{
      toast({
        title: 'Link Copied',
        description: "Profile link copied to clipboard.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    });
  }
  return (
    
    <section>
      <VStack gap={4} alignItems={'start'}>
       <Flex justifyContent={'space-between'} w={'full'} >
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>Mark Zuckerberg</Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'}>zuck</Text>
          </Flex>
        </Box>
        <Box>
          <Avatar 
            name= "Mark Zuckerberg"
            src="/zuck-avatar.png"
            size={{
              base: 'md',
              md: 'xl',
            }}
          />
        </Box>
       </Flex>
       <Text>Lorem ipsum dolor sit aosldasmv  sldsc c</Text>
       <Flex w={'full'} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={'center'}>
          <Text color={'gray.light'}>3.2M followers</Text>
          <Box w='1' h='1' bg={'gray.light'} borderRadius={'full'}></Box>
          <Link color={'gray.light'} cursor={'pointer'}>leetcode.com</Link>
        </Flex>
        <Flex gap={4}>
          <Box>
            <FaGithub size={24} cursor={'pointer'}/>
          </Box>
          <Box>
          <Menu>
            <MenuButton><CgMoreO size={24} cursor={'pointer'}/></MenuButton>
            <Portal>
              <MenuList >
                <MenuItem onClick={copyLink}>Copy Link</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
          </Box>
        </Flex>
       </Flex>

       <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={'pointer'}>
          <Text fontWeight={"bold"}>Posts</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={'pointer'}>
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
       </Flex>
      </VStack>
    </section>
  )
}

export default UserHeader