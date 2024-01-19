import { Flex, Image, useColorMode } from '@chakra-ui/react'; 

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <header>
        <Flex justifyContent={"center"} mt={6} mb="12">
            <Image 
                cursor={"pointer"}
                alt='logo'
                w= {6}
                src = {colorMode === 'dark' ? '/orca-darkmode-logo.svg' : '/orca-lightmode-logo.svg'}
                onClick = { toggleColorMode }
                />
        </Flex>
        </header>
    )
}

export default Header