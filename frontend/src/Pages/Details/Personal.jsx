import { Avatar, Box, Button, Flex, FormLabel, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ADD_PERSONAL_DETAILS } from '../../redux/detailsReducer/actionType';
import { useNavigate } from 'react-router-dom';
//some css
const flexDirection = { xl: "row", lg: "row", md: "column", sm: "column", base: "column" }
const width = { xl: "50%", lg: "50%", md: "100%", sm: "100%", base: "100%" }
const Personal = () => {
    const { personalData } = useSelector((store) => {
        return {
            personalData: store.detailsReducer.personalData
        }
    }, shallowEqual)
    const [imageURL, setImageURL] = useState(personalData?.imageURL||"")
    const [jobTitle, setJobTitle] = useState(personalData?.jobTitle||"")
    const [fname,setFname]=useState(personalData?.fname||"")
    const [lname,setLname]=useState(personalData?.lname||"")
    const [email,setEmail]=useState(personalData?.email||"")
    const [phone,setPhone]=useState(personalData?.phone||"")
    const [address,setAddress]=useState(personalData?.address||"")
    const [linkedin,setLinkedin]=useState(personalData?.linkedin||"")
    const [github,setGithub]=useState(personalData?.github||"")
    const [website,setWebsite]=useState(personalData?.website||"")
    const [summary,setSummary]=useState(personalData?.summary||"")
    const toast=useToast()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handlePicture = (e) => {
        const file = e.target.files[0];
        const imageurl = URL.createObjectURL(file)
        setImageURL(imageurl)
    }
    const handleNext=()=>{
        if(!imageURL || !fname || !email || !address){
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status:"warning",
                position:'top'
              })
        }else{
            const personalDetails={
                imageURL,jobTitle,fname,lname,email,phone,address,linkedin,github,website,summary
            }
            dispatch({type:ADD_PERSONAL_DETAILS,payload:personalDetails})
            navigate("/details/education")
        }
        
    }
    return (
        <div>
            <Box>
                <Heading fontSize={"24px"} fontWeight={500}>Personal Details</Heading>
                <br />
                <hr />
                <br />
                <FormLabel>Profile Picture</FormLabel>
                <Flex justifyContent={"space-between"} flexDirection={flexDirection}
                    gap={"40px"}
                >
                    <Flex alignItems={"center"} gap={"5px"} w={width}>
                        <Avatar bg='red.500' icon={<AiOutlineUser fontSize='1.5rem' />}
                            src={imageURL}
                        />
                        <Flex>
                            <input type='file' accept='image/*' placeholder='upload image' onChange={handlePicture} />
                        </Flex>
                    </Flex>
                    <Box w={width}>
                        <FormLabel>Job title</FormLabel>
                        <Input value={jobTitle} placeholder='eg: a full stack web developer' onChange={(e) => setJobTitle(e.target.value)} />
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>First Name</FormLabel>
                        <Input value={fname} placeholder='eg: Ezhar' onChange={(e)=>setFname(e.target.value)}/>
                    </Box>
                    <Box w={width}>
                        <FormLabel>Last Name</FormLabel>
                        <Input value={lname} placeholder='eg: Ashraf' onChange={(e)=>setLname(e.target.value)}/>
                    </Box>
                </Flex>
                <br />
                <FormLabel>Professional Summary</FormLabel>
                <Textarea value={summary} placeholder='eg: enter about your self here i.e. your professional summary / bio...' onChange={(e)=>setSummary(e.target.value)}/>
                <br />
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Email Address</FormLabel>
                        <Input value={email} type='email' placeholder='eg: example@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
                    </Box>
                    <Box w={width}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input value={phone} placeholder='eg: Ashraf' onChange={(e)=>setPhone(e.target.value)}/>
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Address</FormLabel>
                        <Input value={address} placeholder='eg: village,city,state etc...' onChange={(e)=>setAddress(e.target.value)}/>
                    </Box>
                    <Box w={width}>
                        <FormLabel>Linkedin(optional)</FormLabel>
                        <Input value={linkedin} type='url' placeholder='eg: Linkedin profile link' onChange={(e)=>setLinkedin(e.target.value)}/>
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Github(optional)</FormLabel>
                        <Input value={github} type='url' placeholder='eg: Github link' onChange={(e)=>setGithub(e.target.value)}/>
                    </Box>
                    <Box w={width}>
                        <FormLabel>Website(optional)</FormLabel>
                        <Input value={website} type='url' placeholder='eg: website,portfolio link etc...' onChange={(e)=>setWebsite(e.target.value)}/>
                    </Box>
                </Flex>
                <br />
                <Flex justifyContent={"center"}>
                    <Button size={"sm"} w={"150px"} colorScheme='blue' onClick={handleNext}>Next</Button>
                </Flex>
            </Box>
        </div>
    )
}

export default Personal
