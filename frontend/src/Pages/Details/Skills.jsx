import { SmallCloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ADD_SKILLS } from '../../redux/detailsReducer/actionType'
import { useNavigate } from 'react-router-dom'

const Skills = () => {
    const {skills}=useSelector((store)=>{
        return {
            skills:store.detailsReducer.skills
        }
    },shallowEqual)
    const [technicalSkills,setTechnicalSkills]=useState(skills?.technicalSkills||[])
    const [techSkill,setTechSkill]=useState("")
    const [softSkills,setSoftSkills]=useState(skills?.softSkills||[])
    const [skill,setSkill]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleTechStack=(e)=>{
        if(e.key=="Enter" || e.key==","){
            setTechnicalSkills([...technicalSkills,techSkill])
            setTechSkill("")
        }    
    }
    const handleDeleteTech=(element)=>{
        const techs=technicalSkills.filter((el)=>el!==element)
        setTechnicalSkills(techs)
    }
    const handleDeleteSoft=(element)=>{
        const softs=softSkills.filter((el)=>el!==element)
        setSoftSkills(softs)
    }
    const handleSoftSkills=(e)=>{
        if(e.key=="Enter" || e.key==","){
            setSoftSkills([...softSkills,skill])
            setSkill("")
        }    
    }
    const handleFinish=()=>{
        const skills={
            technicalSkills,
            softSkills
        }
        dispatch({type:ADD_SKILLS,payload:skills})
        navigate("/details/resumes")
    }
    return (
        <div>
            <Box>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading fontSize={"24px"} fontWeight={500}>Skills</Heading>
                    <Button onClick={()=>navigate("/details/resumes")} size={'sm'} colorScheme='red'>Skip & Generate Resume</Button>
                </Flex>
                <Text fontStyle={"italic"} color={"#0026ff"}>Add your top skills here.</Text>
                <br />
                <hr />
                <br />
                <Box w={"100%"}>
                    <FormLabel>Technical Skills</FormLabel>
                    <Text mt={"-10px"} fontSize={"12px"} mb={"10px"}>(Press enter after every skill)</Text>
                    <Flex display={technicalSkills.length>0?"flex":"none"} alignItems={"center"} p="5px" gap={"10px"} mb={"5px"} flexWrap={"wrap"}>
                       {technicalSkills?.map((el)=>{
                        return (
                            <Flex key={el+Date.now()} alignItems={"center"} gap={"5px"}
                            bgColor={"#e3e6ff"} color={"black"} pr={"5px"} pl={"7px"} borderRadius={"5px"}
                            >
                                <Text>{el}</Text>
                                <Text fontSize={"18px"} color={"red"} _hover={{cursor:"pointer"}} onClick={()=>handleDeleteTech(el)}
                                ><SmallCloseIcon/></Text>
                            </Flex>
                        )
                       })}
                    </Flex>
                    <Input placeholder='e.g. Reactjs,Nodejs etc...' value={techSkill} onChange={(e)=>setTechSkill(e.target.value)} onKeyDown={handleTechStack}/>
                </Box>
                <br />
                <Box w={"100%"}>
                    <FormLabel>Soft Skills</FormLabel>
                    <Text mt={"-10px"} fontSize={"12px"} mb={"10px"}>(Press enter after every skill)</Text>
                    <Flex display={softSkills.length>0?"flex":"none"} alignItems={"center"} p="5px" gap={"10px"} mb={"5px"} flexWrap={"wrap"}>
                       {softSkills?.map((el)=>{
                        return (
                            <Flex key={el+Date.now()} alignItems={"center"} gap={"5px"}
                            bgColor={"#e3e6ff"} color={"black"} pr={"5px"} pl={"7px"} borderRadius={"5px"}
                            >
                                <Text>{el}</Text>
                                <Text fontSize={"18px"} color={"red"} _hover={{cursor:"pointer"}} onClick={()=>handleDeleteSoft(el)}
                                ><SmallCloseIcon/></Text>
                            </Flex>
                        )
                       })}
                    </Flex>
                    <Input placeholder='e.g. communication,collaboration etc...' value={skill} onChange={(e)=>setSkill(e.target.value)} onKeyDown={handleSoftSkills}/>
                </Box>
                <br />
                <Flex justifyContent={"center"}>
                    <Button size={"sm"} w={"150px"} colorScheme='blue' onClick={handleFinish}>Generate Resume</Button>
                </Flex>
            </Box>
        </div>
    )
}

export default Skills
