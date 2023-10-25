import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormLabel, Heading, Image, Input, Switch, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
const flexDirection = { xl: "row", lg: "row", md: "column", sm: "column", base: "column" }
const width = { xl: "50%", lg: "50%", md: "100%", sm: "100%", base: "100%" }
import { MdSchool } from "react-icons/md";
import { ADD_EDUCATION } from '../../redux/detailsReducer/actionType'
import { useNavigate } from 'react-router-dom'
const Education = () => {
    const {educations } = useSelector((store) => {
        return {
            educations:store.detailsReducer.educations
        }
    }, shallowEqual)
    const [sname, setSname] = useState("")
    const [slocation, setSlocation] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [degree, setDegree] = useState("")
    const [studyField, setStudyField] = useState("")
    const [description, setDescription] = useState("")
    const [education, setEducation] = useState(educations||[])
    const toast = useToast()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleMore = () => {
        if (!sname || !slocation || !startDate || !endDate || !degree) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        } else {
            const addEducation = {
                id:Date.now(),
                sname, slocation, startDate, endDate, degree, studyField, description
            }
            setEducation([...education, addEducation])
            setSname("")
            setSlocation("")
            setStartDate("")
            setEndDate("")
            setDegree("")
            setStudyField("")
            setDescription("")
            dispatch({type:ADD_EDUCATION,payload:[...education, addEducation]})
        }

    }
    const handleNext = () => {
        if (education.length == 0 && (!sname || !slocation || !startDate || !endDate || !degree)) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        }else if(!sname || !slocation || !startDate || !endDate || !degree){
           dispatch({type:ADD_EDUCATION,payload:education})
           navigate("/details/experience")
        }else {
            const addEducation = {
                id:Date.now(),
                sname, slocation, startDate, endDate, degree, studyField, description
            }
            // setEducation([...education, addEducation])
            setSname("")
            setSlocation("")
            setStartDate("")
            setEndDate("")
            setDegree("")
            setStudyField("")
            setDescription("")
            dispatch({type:ADD_EDUCATION,payload:[...education, addEducation]})
            navigate("/details/experience")
        }
    }

    const handleDelete=(id)=>{
        const filteredEducation=education.filter((el)=>{
            return el.id!==id;
        })
        setEducation(filteredEducation)
    }
    return (
        <div>
            <Box>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading fontSize={"24px"} fontWeight={500}>Education</Heading>
                </Flex>
                <Text fontStyle={"italic"} color={"#0026ff"}>Add your most relevant education, including programs you're currently enrolled in.</Text>
                <br />
                <hr />
                <br />
                <Box display={education.length > 0 ? "block" : "none"}>
                    {
                        education?.map((el,ind) => {
                            return (
                                <Flex key={ind}  alignItems={"center"} justifyContent={"space-between"}
                                border={"1px solid #a8a8a8"}
                                p={"10px"} borderRadius={"5px"}
                                mb={"20px"}
                                >
                                    <Flex gap={"5px"} alignItems={"center"} color={"#d400ff"}>
                                        <Flex mr={"10px"}>
                                         <MdSchool size={"20px"} color='black'/>
                                        </Flex>
                                        <Text>{el.degree}</Text>
                                        <Text>at</Text>
                                        <Text>{el.sname},</Text>
                                        <Text>{el.slocation}...</Text>
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
                        <FormLabel>School Name</FormLabel>
                        <Input value={sname} placeholder='e.g. Masai School' onChange={(e) => setSname(e.target.value)} />
                    </Box>
                    <Box w={width}>
                        <FormLabel>School Location</FormLabel>
                        <Input value={slocation} onChange={(e) => setSlocation(e.target.value)} placeholder='e.g. Bangalore' />
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Start Date</FormLabel>
                        <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} type='date'/>
                    </Box>
                    <Box w={width}>
                        <FormLabel>End Date</FormLabel>
                        <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} type='date'/>
                        <Flex alignItems={"center"} gap={"5px"}>
                            <Switch size={'sm'} onChange={(e) => {
                                if (e.target.checked) {
                                    setEndDate("present")
                                }
                            }} />
                            <FormLabel mt={"5px"} fontWeight={400} fontSize={"14px"}>currently study here</FormLabel>
                        </Flex>
                    </Box>
                </Flex>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Degree</FormLabel>
                        <Input type='text' placeholder='e.g. Bachelor of Computer Application' value={degree} onChange={(e) => setDegree(e.target.value)} />
                    </Box>
                    <Box w={width}>
                        <FormLabel>Field of Study</FormLabel>
                        <Input type='text' placeholder='e.g. Full Stack Developer' value={studyField} onChange={(e) => setStudyField(e.target.value)} />
                    </Box>
                </Flex>
                <br />
                <Box w={"100%"}>
                    <FormLabel>Description(optional)</FormLabel>
                    <Textarea placeholder='e.g. Course work toward:Degree title, School name,City, ST or online etc...' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Box>
                <br />
                <Flex justifyContent={"space-between"}>
                    <Button size={'sm'} colorScheme='green' onClick={handleMore}>Add more education</Button>
                    <Button size={"sm"} colorScheme='blue' onClick={handleNext}>Next</Button>
                </Flex>
            </Box>
        </div>
    )
}

export default Education
