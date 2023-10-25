import { Box, Button, Flex, FormLabel, Heading, Input, Switch, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ADD_EXPERIENCE } from '../../redux/detailsReducer/actionType'
import { MdWork } from 'react-icons/md'
import { DeleteIcon } from '@chakra-ui/icons'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const flexDirection = { xl: "row", lg: "row", md: "column", sm: "column", base: "column" }
const width = { xl: "50%", lg: "50%", md: "100%", sm: "100%", base: "100%" }
const Experience = () => {
    const {experiences}=useSelector((store)=>{
        return {
            experiences:store.detailsReducer.experiences
        }
    },shallowEqual)
    const [posTitle,setPosTitle]=useState("")
    const [companyName,setCompanyName]=useState("")
    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate]=useState("")
    const [workSummary,setWorkSummary]=useState("")
    const [experience,setExperience]=useState(experiences||[])
    const dispatch=useDispatch()
    const toast=useToast()
    const navigate=useNavigate()

    const handleMore=()=>{
        if (!posTitle || !companyName || !startDate || !endDate) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        } else {
            const addExperience = {
                id:Date.now(),
                posTitle, companyName, startDate, endDate,workSummary
            }
            setExperience([...experience, addExperience])
            setPosTitle("")
            setCompanyName("")
            setStartDate("")
            setEndDate("")
            setWorkSummary("")
            dispatch({type:ADD_EXPERIENCE,payload:[...experience, addExperience]})
        }
    }
    const handleNext=()=>{
        if (experience.length == 0 && (!posTitle || !companyName || !startDate || !endDate)) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        }else if(!posTitle || !companyName || !startDate || !endDate){
           dispatch({type:ADD_EXPERIENCE,payload:experience})
           navigate("/details/project")
        }else {
            const addExperience = {
                id:Date.now(),
                posTitle, companyName, startDate, endDate, workSummary
            }
            // setExperience([...experience, addExperience])
            setPosTitle("")
            setCompanyName("")
            setStartDate("")
            setEndDate("")
            setWorkSummary("")
            dispatch({type:ADD_EXPERIENCE,payload:[...experience, addExperience]})
            navigate("/details/project")
        }
    }
    const handleDelete=(id)=>{
        const filteredExperience=experience.filter((el)=>{
            return el.id!==id;
        })
        setExperience(filteredExperience)
    }
  return (
    <div>
        <Box>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading fontSize={"24px"} fontWeight={500}>Work Experience</Heading>
                    <Button size={'sm'} colorScheme='red' onClick={()=>navigate("/details/project")}>Skip</Button>
                </Flex>
                <Text fontStyle={"italic"} color={"#0026ff"}>Add your most recent jobs.</Text>
                <br />
                <hr />
                <br />
                <Box display={experience.length > 0 ? "block" : "none"}>
                    {
                        experience?.map((el) => {
                            return (
                                <Flex key={el.id}  alignItems={"center"} justifyContent={"space-between"}
                                border={"1px solid #a8a8a8"}
                                p={"10px"} borderRadius={"5px"}
                                mb={"20px"}
                                >
                                    <Flex gap={"5px"} alignItems={"center"} color={"#d400ff"}>
                                        <Flex mr={"10px"}>
                                         <MdWork size={"20px"} color='black'/>
                                        </Flex>
                                        <Text>{el.posTitle}</Text>
                                        <Text>at</Text>
                                        <Text>{el.companyName}...</Text>
                                    </Flex>
                                    <Flex alignItems={"center"}>
                                        <DeleteIcon color={"red"} _hover={{cursor:"pointer"}} onClick={()=>handleDelete(el.id)}/>
                                    </Flex>

                                </Flex>
                            )
                        })
                    }
                </Box>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Position Title</FormLabel>
                        <Input value={posTitle} placeholder='e.g. front-end developer' onChange={(e) => setPosTitle(e.target.value)} />
                    </Box>
                    <Box w={width}>
                        <FormLabel>Company Name</FormLabel>
                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='e.g. google' />
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Start Date</FormLabel>
                        <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} type='date' />
                    </Box>
                    <Box w={width}>
                        <FormLabel>End Date</FormLabel>
                        <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} type='date' />
                        <Flex alignItems={"center"} gap={"5px"}>
                            <Switch size={'sm'} onChange={(e) => {
                                if (e.target.checked) {
                                    setEndDate("present")
                                }
                            }} />
                            <FormLabel mt={"5px"} fontWeight={400} fontSize={"14px"}>currently employed</FormLabel>
                        </Flex>
                    </Box>
                </Flex>
                <br />
                <Box w={"100%"}>
                    <FormLabel>Work Summary(optional)</FormLabel>
                    <Textarea placeholder='e.g. Supported mentor teacher throughout lessons by preparing...' value={workSummary} onChange={(e) => setWorkSummary(e.target.value)} />
                </Box>
                <br />
                <Flex justifyContent={"space-between"}>
                    <Button size={'sm'} colorScheme='green' onClick={handleMore}>Add more work experience</Button>
                    <Button size={"sm"} colorScheme='blue' onClick={handleNext}>Next</Button>
                </Flex>
        </Box>
    </div>
  )
}

export default Experience
