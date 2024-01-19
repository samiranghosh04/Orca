import { useState } from "react"
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar} from "@chakra-ui/avatar"
import { Divider } from "@chakra-ui/react"
import Actions from "./Actions"
import { BsThreeDots } from "react-icons/bs";

const Comment = ({userAvatar, userName, comment, createdAt, likes}) => {
  const [liked, setLiked] = useState(); 
  return (
    <>
        <Flex gap={4} py={2} my={2} w={'full'}>
            <Avatar  src={userAvatar} size={'sm'}/>
            <Flex gap={1} w={'full'} flexDirection={'column'}>
                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>{userName}</Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'} color={'gray.light'}>{createdAt}</Text>
                        <BsThreeDots/>
                    </Flex>
                </Flex>
                    <Text>{comment}</Text>
                    <Actions liked={liked} setLiked={setLiked}/>
                    <Text color={'gray.light'} fontSize={'sm'}>{likes + (liked ? 1 : 0)} likes</Text>
            </Flex>
        </Flex>
        <Divider my={4}/>
    </>
  )
}

export default Comment