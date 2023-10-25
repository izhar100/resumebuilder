import { CloseIcon, DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormLabel, Heading, Input, Switch, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillProject } from 'react-icons/ai'
import { ADD_PROJECT } from '../../redux/detailsReducer/actionType'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const flexDirection = { xl: "row", lg: "row", md: "column", sm: "column", base: "column" }
const width = { xl: "50%", lg: "50%", md: "100%", sm: "100%", base: "100%" }
const Projects = () => {
    const {projects}=useSelector((store)=>{
        return {
            projects:store.detailsReducer.projects
        }
    },shallowEqual)
    const [projectName,setProjectName]=useState("")
    const [projectType,setProjectType]=useState("")
    const [projectDescription,setProjectDescription]=useState("")
    const [techStack,setTackStack]=useState([])
    const [singleTech,setSingleTech]=useState("")
    const [liveLink,setLiveLink]=useState("")
    const [githubLink,setGithubLink]=useState("")
    const [project,setProject]=useState(projects||[])
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleMore=()=>{
        if (!projectName || !projectType || !projectDescription) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        } else {
            const addProject = {
                id:Date.now(),
                projectName, projectType, projectDescription, techStack,liveLink,githubLink
            }
            setProject([...project, addProject])
            setProjectName("")
            setProjectType("")
            setProjectDescription("")
            setTackStack([])
            setLiveLink("")
            setGithubLink("")
            dispatch({type:ADD_PROJECT,payload:[...project, addProject]})
        }

    }

    const handleNext=()=>{
        if (project.length == 0 && (!projectName || !projectType || !projectDescription)) {
            toast({
                title: `Please fill all details`,
                variant: 'top-accent',
                isClosable: true,
                status: "warning",
                position: 'top'
            })
        }else if(!projectName || !projectType || !projectDescription){
           dispatch({type:ADD_PROJECT,payload:project})
           navigate("/details/skills")
        }else {
            const addProject = {
                id:Date.now(),
                projectName, projectType, projectDescription, techStack,liveLink,githubLink
            }
            // setExperience([...experience, addExperience])
            setProject([...project, addProject])
            setProjectName("")
            setProjectType("")
            setProjectDescription("")
            setTackStack([])
            setLiveLink("")
            setGithubLink("")
            dispatch({type:ADD_PROJECT,payload:[...project, addProject]})
            navigate("/details/skills")
        }

    }
    const handleTechStack=(e)=>{
        if(e.key=="Enter" || e.key==","){
            setTackStack([...techStack,singleTech])
            setSingleTech("")
        }
        
    }
    const handleDeleteTech=(element)=>{
        const techs=techStack.filter((el)=>el!==element)
        setTackStack(techs)
    }
    const handleDelete=(id)=>{
        const filteredProjects=project?.filter((el)=>el.id!==id)
        setProject(filteredProjects)
    }
  return (
    <div>
      <Box>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading fontSize={"24px"} fontWeight={500}>Projects</Heading>
                    <Button onClick={()=>navigate("/details/skills")} size={'sm'} colorScheme='red'>Skip</Button>
                </Flex>
                <Text fontStyle={"italic"} color={"#0026ff"}>Add your best projects here.</Text>
                <br />
                <hr />
                <br />
                <Box display={project.length > 0 ? "block" : "none"}>
                    {
                        project?.map((el) => {
                            return (
                                <Flex key={el.id}  alignItems={"center"} justifyContent={"space-between"}
                                border={"1px solid #a8a8a8"}
                                p={"10px"} borderRadius={"5px"}
                                mb={"20px"}
                                >
                                    <Flex gap={"5px"} alignItems={"center"} color={"#d400ff"}>
                                        <Flex mr={"10px"}>
                                         <AiFillProject size={"20px"} color='black'/>
                                        </Flex>
                                        <Text>{el.projectName},</Text>
                                        <Text noOfLines={1}>{el.projectDescription}</Text>
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
                        <FormLabel>Project Name</FormLabel>
                        <Input value={projectName} placeholder='e.g. Whatsapp Clone' onChange={(e) => setProjectName(e.target.value)} />
                    </Box>
                    <Box w={width}>
                        <FormLabel>Project Type</FormLabel>
                        <Input value={projectType} onChange={(e) => setProjectType(e.target.value)} placeholder='e.g. Individual/Group project etc...' />
                    </Box>
                </Flex>
                <br />
                <Box w={"100%"}>
                    <FormLabel>Tech Stack</FormLabel>
                    <Text mt={"-10px"} fontSize={"12px"}>(Press enter after every tech stack)</Text>
                    <Flex display={techStack.length>0?"flex":"none"} alignItems={"center"} p="5px" gap={"10px"} mb={"5px"} flexWrap={"wrap"}>
                       {techStack?.map((el)=>{
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
                    <Input placeholder='e.g. Reactjs,Nodejs etc...' value={singleTech} onChange={(e)=>setSingleTech(e.target.value)} onKeyDown={handleTechStack}/>
                </Box>
                <br />
                <br />
                <Box w={"100%"}>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder='e.g. key contributor in a 5-day team project to create a WhatsApp clone using MERN stack. My role involved building the backend infrastructure, enabling real-time messaging and user authentication. etc...' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                </Box>
                <br />
                <Flex flexDirection={flexDirection} gap={"40px"}>
                    <Box w={width}>
                        <FormLabel>Live Link(deployed)</FormLabel>
                        <Input value={liveLink} placeholder='e.g. deployed link of project' onChange={(e) => setLiveLink(e.target.value)} />
                    </Box>
                    <Box w={width}>
                        <FormLabel>Github Link</FormLabel>
                        <Input value={githubLink} onChange={(e) => setGithubLink(e.target.value)} placeholder='e.g. github link of project repo...' />
                    </Box>
                </Flex>
                <br />
                <Flex justifyContent={"space-between"}>
                    <Button size={'sm'} colorScheme='green' onClick={handleMore}>Add more projects</Button>
                    <Button size={"sm"} colorScheme='blue' onClick={handleNext}>Next</Button>
                </Flex>
        </Box>
    </div>
  )
}

export default Projects
