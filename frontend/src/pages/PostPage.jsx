import { Flex, Text, Box } from "@chakra-ui/layout";
import { Avatar} from "@chakra-ui/avatar"
import { Image, Divider, Button } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import { useState } from "react";

const PostPage = () => {
  const [liked, setLiked] = useState();
  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'}  gap={3}>
          <Avatar src="/zuck-avatar.png" size={'md'} name="Mark Zuckerberg"/>
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>zuck</Text>
            <Image src="/verified.png" w={4} h={4} ml={4}/>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
          <BsThreeDots/>
        </Flex>
      </Flex>
      <Text my={3}>Lets talk about Orca.</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src='/post1.png' />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked = {liked} setLiked={setLiked}/>
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'sm'}>123 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'sm'}>{4210 + (liked ? 1 : 0)} likes</Text>
      </Flex>
      <Divider my={4}/>
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={'gray.light'}>Pre-Order the app to like, post and reply now</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4}/>
      <Comment
        comment = "Welcome to Orca Mark!"
        createdAt = '1d'
        likes = {100}
        userName = 'johndoe'
        userAvatar = 'https://bit.ly/dan-abramov'
      />
      <Comment
        comment = "Welcome to Orca Mark!"
        createdAt = '1d'
        likes = {100}
        userName = 'johndoe'
        userAvatar = 'https://bit.ly/dan-abramov'
      />
      <Comment
        comment = "Welcome to Orca Mark!"
        createdAt = '1d'
        likes = {100}
        userName = 'johndoe'
        userAvatar = 'https://bit.ly/dan-abramov'
      />
     
    </>
  )
}

export default PostPage