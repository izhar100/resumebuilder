import { Box, Button, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import logo from './../assets/resumelift.png'

const Navbar = () => {
    const navigate=useNavigate()
    return (
        <div>
            <Box pt={"5px"} pb={"5px"} boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"} zIndex={2} bgColor={"#ffffff"}>
                <Flex w={{xl:"90%",lg:"90%",md:"90%",sm:"95%",base:"95%"}} m={"auto"} justifyContent={"space-between"} alignItems={"center"}>
                    <Flex alignItems={"center"} onClick={()=>navigate("/")} _hover={{cursor:"pointer"}}>
                        <Image src={logo}/>
                    </Flex>
                    <Flex gap={"50px"} alignItems={"center"} display={{xl:"flex",lg:"flex",md:"none",sm:"none",base:"none"}}>
                        <Text fontWeight={500} onClick={()=>navigate("/")}>Home</Text>
                        <Text fontWeight={500}>About</Text>
                        <Text fontWeight={500}>Privacy Policy</Text>
                        <Button size={"md"} colorScheme='blue'>Login</Button>
                        <Button size={"md"} colorScheme='pink'>Sign Up</Button>
                    </Flex>
                    <Flex display={{xl:"none",lg:"none",md:"flex",sm:"flex",base:"flex"}}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem onClick={()=>navigate("/")}>Home</MenuItem>
                                <hr />
                                <MenuItem>About</MenuItem>
                                <Flex justifyContent={"center"} gap={"20px"}><Button size={"sm"} colorScheme='blue'>Login</Button>
                                <Button size={"sm"} colorScheme='pink'>Sign Up</Button></Flex>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </div>
    )
}

export default Navbar
