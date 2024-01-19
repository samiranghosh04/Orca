import { Link } from "react-router-dom"
import { Flex, Box, Text } from "@chakra-ui/layout"
import { Image, Divider } from "@chakra-ui/react"
import { Avatar} from "@chakra-ui/avatar"
import { BsThreeDots } from "react-icons/bs"
import { useState } from "react"
import Actions from "./Actions"

const UserPost = ({postImg, likes, replies, postTitle}) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={'./zuck/posts/1'}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar size='md' name="Mark Zuckerberg" src="/zuck-avatar.png"/>
          <Box w='1px' h={'full'} bg={'gray.light'} my={2}></Box>
          <Box position={'relative'} w={'full'}>
            <Avatar
              size= 'xs'
              name= "John Doe"
              src='https://bit.ly/dan-abramov'
              position={'absolute'}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size= 'xs'
              name= "John Doe"
              src='https://bit.ly/kent-c-dodds'
              position={'absolute'}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size= 'xs'
              name= "John Doe"
              src='https://bit.ly/code-beast'
              position={'absolute'}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={"full"} alignItems={"center"} gap={2}>
              <Text fontSize={'sm'} fontWeight = {"bold"}>zuck</Text>
              <Image src="verified.png" w={4} h={4}/>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>{postTitle}</Text>
            {postImg && (
              <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={postImg} />
              </Box>
            )}
          
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked}/>
          </Flex>
          <Flex gap={2} alignItems={'center'}>
            <Text color={"gray.light"} fontSize={'sm'}>{replies} replies</Text>
            <Box w={0.5} h={0.5} borderRadius={'full'} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={'sm'}>{likes} likes</Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider my={4}/>
    </Link>
  )
}

export default UserPost