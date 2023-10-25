import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { MdLocationPin, MdOutlineEmail, MdPhone } from 'react-icons/md'
import { TbWorldWww } from "react-icons/tb"
import { shallowEqual, useSelector } from 'react-redux'
import { usePDF } from 'react-to-pdf'
import { useReactToPrint } from 'react-to-print';

const Resume = ({ align = "left", imageBorderRadius = "full", imageBgColor = "#e7e7e7", imageFontColor = "#000000", imageSize = "130", detailsBgColor = "#cacaca", detailsFontColor = "#000000", headingBgColor = "#000000" }) => {
    const { personalData, educations, experiences, skills, projects } = useSelector((store) => {
        console.log(store)
        return {
            personalData: store.detailsReducer.personalData,
            educations: store.detailsReducer.educations,
            experiences: store.detailsReducer.experiences,
            skills: store.detailsReducer.skills,
            projects: store.detailsReducer.projects
        }
    }, shallowEqual)

    const [loading, setLoading] = useState(false)
    const ref = useRef()
    const [githubusername, setGithubusername] = useState("")
    const [linkedinusername, setLinkedinusername] = useState("")
    const [hideButton,setHideButton]=useState(false)

    useEffect(() => {
        console.log(personalData, educations, experiences, projects)
        setGithubusername(githubUser(personalData?.github))
        setLinkedinusername(linkedinUser(personalData?.linkedin))
    }, [githubusername, linkedinusername,hideButton])

    // const downloadPDF=()=>{
    //     const capture=document.querySelector('.resumeBox')
    //     setLoading(true)
    //     html2canvas(capture).then((canvas)=>{
    //         const imgData=canvas.toDataURL('img/png')
    //         const doc = new jsPDF('p','px','a4')
    //         const componentWidth=doc.internal.pageSize.getWidth();
    //         // const componentWidth=612;
    //         const componentHeight=doc.internal.pageSize.getHeight();
    //         // const componentHeight=792;
    //         doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight)
    //         setLoading(false)
    //         doc.save('resume.pdf')
    //     })
    // }

    const downloadPDF = () => {
        setHideButton(true)
        const style = `@page { size: 612 792; margin:auto;}`;
        
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(style, 0);
        setTimeout(()=>{
            window.print()
            setHideButton(false)
        },2000)
    }

    function githubUser(link) {
        console.log("link:", link)
        const match = link && link.match(/github\.com\/([^/]+)/);
        console.log("match:", match)
        return match ? match[1] : null;
    }
    function linkedinUser(link) {
        const match = link && link.match(/linkedin\.com\/in\/([^/]+)/);
        return match ? match[1] : null;
    }
    function formatMonthYear(inputDate) {
        const options = { year: 'numeric', month: 'short' };
        return new Date(inputDate).toLocaleDateString(undefined, options);
    }



    return (
        <div>
            <br />
            <Box>
                <Box id='resume-component' w={"612px"} h={"792px"} m={"auto"} ref={ref}>
                    <Flex className='resumeBox' flexDirection={align == "left" ? "row" : "row-reverse"}>
                        <Box className='imageBox' bgColor={imageBgColor} p={"10px"}
                            color={imageFontColor} w={"35%"} h={"792px"}
                        >
                            <Image borderRadius={imageBorderRadius} src={personalData?.imageURL} w={imageSize + "px"} m={"auto"} />
                            <br />
                            <Box className='contact'>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Contact</Text>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <MdOutlineEmail />
                                    <Text fontSize={"12px"}>{personalData?.email}</Text>
                                </Flex>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <MdPhone />
                                    <Text fontSize={"12px"}>{personalData?.phone}</Text>
                                </Flex>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <MdLocationPin />
                                    <Text fontSize={"12px"}>{personalData?.address}</Text>
                                </Flex>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <a href={personalData?.github} target='_blanck'><AiFillGithub /></a>
                                    <Text fontSize={"12px"}>{githubusername}</Text>
                                </Flex>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <a href={personalData?.linkedin} target='_blanck'><AiFillLinkedin /></a>
                                    <Text fontSize={"12px"}>{linkedinusername}</Text>
                                </Flex>
                                <Flex mt={"5px"} gap={"5px"} alignItems={"center"}>
                                    <a href={personalData?.website} target='_blanck'><TbWorldWww /></a>
                                    <Text fontSize={"12px"}>{linkedinusername}</Text>
                                </Flex>
                            </Box>
                            <Box display={educations?.length > 0 ? "block" : "none"} className='education' mt={"7px"}>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Education</Text>
                                <Box>
                                    {
                                        educations?.map((el) => {
                                            return (
                                                <Box key={el.id} mt={"5px"} pb={"2px"} borderBottom={"1px solid #cacaca"}>
                                                    <Text fontWeight={500} fontSize={"14px"}>{el.degree}</Text>
                                                    <Text fontSize={"13px"}>{el.sname}, {el.slocation}</Text>
                                                    <Text fontSize={"12px"}>{formatMonthYear(el.startDate
                                                    )} - {el.endDate !== "present" ? formatMonthYear(el.endDate) : el.endDate}</Text>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box display={skills?.technicalSkills?.length > 0 ? "block" : "none"} className='technical-Skills' mt={"7px"}>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Technical Skills</Text>
                                <Flex mt={"8px"} gap={"5px"} flexWrap={"wrap"} fontSize={"12px"}>
                                    {
                                        skills?.technicalSkills?.map((skill) => {
                                            return (
                                                <Text fontWeight={500} pr={"5px"} pl={"5px"} borderRadius={"5px"} bgColor={"white"}>{skill}</Text>
                                            )
                                        })
                                    }
                                </Flex>
                            </Box>
                            <Box display={skills?.softSkills?.length > 0 ? "block" : "none"} className='soft-skill' mt={"7px"}>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Soft Skills</Text>
                                <Flex mt={"8px"} gap={"5px"} flexWrap={"wrap"} fontSize={"12px"}>
                                    {
                                        skills?.softSkills?.map((skill) => {
                                            return (
                                                <Text fontWeight={500} pr={"5px"} pl={"5px"} borderRadius={"5px"} bgColor={"white"}>{skill}</Text>
                                            )
                                        })
                                    }
                                </Flex>
                            </Box>
                        </Box>
                        <Box className='detailsBox' bgColor={detailsBgColor} p={"10px"}
                            color={detailsFontColor} w={"70%"}
                        >
                            <Flex flexDirection={"column"} justifyContent={"center"} h={imageSize}>
                                <Heading>{personalData?.fname} {personalData?.lname}</Heading>
                                <Text fontWeight={500} fontSize={"20px"}>{personalData?.jobTitle
                                }</Text>
                            </Flex>
                            <Box className='summery'>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Professonal Summary</Text>
                                <Text fontSize={"13px"} textAlign={"justify"} mt={"5px"}
                                >{personalData?.summary
                                    }</Text>
                            </Box>
                            <Box className='experience' mt={"7px"} display={experiences?.length > 0 ? "block" : "none"}>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Work Experience</Text>
                                <Box>
                                    {
                                        experiences?.map((ex) => {
                                            return (
                                                <Box key={ex.id} mt={"5px"} pb={"2px"} >
                                                    <Text fontWeight={500} fontSize={"14px"}>{ex.posTitle
                                                    } at {ex.companyName
                                                        }</Text>
                                                    <Text fontSize={"13px"}>{formatMonthYear(ex.startDate)} - {ex.endDate !== "present" ? formatMonthYear(ex.endDate) : ex.endDate}</Text>
                                                    <Text fontSize={"12px"}>{ex.workSummary
                                                    }</Text>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box className='experience' mt={"7px"} display={projects?.length > 0 ? "block" : "none"}>
                                <Text textAlign={'center'} borderRadius={"5px"} fontWeight={700} border={"2px solid black"}
                                    color={"black"} fontSize={"18px"}>Project</Text>
                                <Box>
                                    {
                                        projects?.map((project) => {
                                            return (
                                                <Box key={project.id} mt={"5px"} pb={"2px"} >
                                                    <Flex alignItems={"center"} gap={"5px"}><a href="" target='_blanck'><Text fontWeight={500} fontSize={"14px"}>{project.projectName
                                                    }</Text></a>-<a href={project.githubLink
                                                    } target='_blanck'><AiFillGithub /></a></Flex>
                                                    <Text fontSize={"12px"}>{project.projectDescription
                                                    }</Text>
                                                    <Flex alignItems={"center"} mt={"5px"}>
                                                        <Text fontWeight={500} fontSize={"13px"} mr={"5px"}>Tech Stacks : </Text>
                                                        <Flex alignItems={"center"} gap={"5px"} flexWrap={"wrap"} fontSize={"12px"}>
                                                            {project.techStack?.map((tech) => {
                                                                return (
                                                                    <Text fontWeight={500} pr={"5px"} pl={"5px"} borderRadius={"5px"} bgColor={"white"}>{tech}</Text>
                                                                )
                                                            })}
                                                        </Flex>
                                                    </Flex>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>

                        </Box>
                    </Flex>
                </Box>
                <Box mt={"5px"} textAlign={"center"} display={hideButton?"none":"block"}>
                <Button colorScheme='blue' onClick={downloadPDF}>Download</Button>
                </Box>
                <br />
            </Box>
        </div>
    )
}

export default Resume
