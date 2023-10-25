import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import homeImage from "../../assets/homeImage.gif"
import flight from "../../assets/flight.png"
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
    return (
        <div>
            <Box bgColor={"#ffffff"} mt={"-20px"}>
            <br />
            <br />
                <Flex w={"100%"} m={"auto"}
                    justifyContent={"space-between"}
                    gap={"20px"}
                    flexDirection={{xl:"row",lg:"row",md:"column",sm:"column",base:"column"}}
                >
                    <Box
                    >
                        <Text fontWeight={500} fontSize={{xl:"14px",lg:"14px",md:"12px",sm:"10px",base:"10px"}}
                        color={"#5672ff"}
                        >BUILD YOUR RESUME WITH EASE</Text>
                        <Heading fontSize={{xl:"50px",lg:"50px",md:"40px",sm:"30px",base:"30px"}}>Craft an impressive CV effortlessly.</Heading>
                        <Text mt={"10px"} fontWeight={400} fontSize={{xl:"22px",lg:"22px",md:"18px",sm:"16px",base:"16px"}}
                        >Online Resume Builder for a Seamless Experience.</Text>
                        <Text mt={"10px"} fontWeight={400} fontSize={{xl:"18px",lg:"18px",md:"16px",sm:"14px",base:"14px"}}>Effortlessly produce <span style={{color:"#ff00e1"}}>a standout resume/CV with advanced tools</span>, tailoring expertly-crafted content to showcase your uniqueness.</Text>
                        <br />
                        <Button colorScheme='blue' onClick={()=>navigate("/details")}>GET STARTED</Button>
                    </Box>
                    <Flex w={{xl:"50%",lg:"50%",md:"100%",sm:"100%",base:"100%"}} justifyContent={"center"} alignItems={"center"}
                    >
                     <Image src={homeImage} w={"100%"}/>
                    </Flex>
                </Flex>
                <br />
                <br />
                <Heading textAlign={"center"}>Commence Crafting Your CV</Heading>
                <br />
                <Flex justifyContent={"center"}
                ><Button colorScheme='blue' onClick={()=>navigate("/details")}>GET STARTED</Button></Flex>
            </Box>
        </div>
    )
}

export default Banner
