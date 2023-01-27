import { memo } from 'react';
// @mui
import { Container, Button, Typography, Box, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Image from '../components/Image';
// components
import Navbar from './StaticNavConfig';


const Item = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        width: '134%',
        marginLeft: '-180px',
        marginRight: '-185px',
        padding: '0px 182px 4px 152px',
    },
}));
const Image1 = styled(Grid)(({ theme }) => ({
    top: '15px',
    left: '20px',
    padding: '0px 40px 0px 0px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        top: '315px',
        left: '50px',
    },
}));
const Image2 = styled(Grid)(({ theme }) => ({
    top: '15px',
    left: '20px',
    padding: '0px 40px 0px 0px',
    [theme.breakpoints.up('md')]: {
        width: '1208px',
        height: '360px',
        marginLeft: '30px',
        marginTop: '30px',
        borderRadius: '50%',
    },
}));
const Stack1 = styled(Stack)(({ theme }) => ({
    marginTop: '310px',
    [theme.breakpoints.down('sm')]: {
        marginTop: '45px',
        padding: '0px 10px 0px 50px',
    },
}));
const Stack2 = styled(Stack)(({ theme }) => ({
    marginLeft: '110px',
    marginTop: '280px',
    [theme.breakpoints.down('sm')]: {
        marginLeft: '30px',
        marginTop: '45px',
        padding: '0px 20px 0px 0px',
    },
}));
const Stack3 = styled(Stack)(({ theme }) => ({
    padding: '95px 0px 0px 130px', 
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 80px 0px 0px',
        color: '#FFFFFF',
    },
}));
const Stack4 = styled(Stack)(({ theme }) => ({
    padding: '95px 0px 0px 130px', 
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0px 0px 70px',
        color: '#FFFFFF',
    },
}));
const BackGroundImage = styled(Grid)(({ theme }) => ({
    backgroundImage:
        "url('/assets/illustrations/Group 48095504.png')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('md')]: {
        width: '132%',
        marginLeft: '-185px',
        marginRight: '-180px',
        padding: '0px 162px 4px 192px',
    },
}));

const buttonText = {
    color: '#FFFFFF',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '40px',
    textTransform: 'none',
};
const button = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 2px',
    width: '200px',
    background: '#6E39D4',
    boxShadow: '0px 0px 20px rgba(110, 57, 212, 0.3)',
    borderRadius: '12px',
};

const card = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '30px',
    borderRadius: '24px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 10px 4px #DFD2F6',
};

const typography = {
    fontStyle: 'normal',
    padding: '0px 0px 0px 20px',
    fontWeight: 500,
    fontSize: '21px',
    lineHeight: '155%',
    color: '#000000',
};
const typography1 = {
    marginLeft: '15px',
    marginTop: '80px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '40px',
    lineHeight: '66px',
    color: '#43227F',
};

const image2 = {
    height: '40px',
    width: '40px',

};
const stack = {
    marginTop: '20px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 2px 2px #DFD2F6',
    borderRadius: '24px',
};
const stack1 = {
    marginLeft: '60px',
    marginTop: '50px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '26px',
    lineHeight: '33px',
    color: '#FFFFFF',
};


function StaticPage() {
    return (
        <>
            <Container>
                <BackGroundImage>
                    <Navbar />
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        spacing={16}
                    >
                        <Stack1 >
                            <Typography variant="h3" sx={{ lineHeight: '36px' }}>
                                Talent <br />COCO
                            </Typography>
                            <Typography variant="body1" sx={{ padding: '75px 0px', fontSize: '25px' }}>Coding and Communication assessment platform</Typography>
                            <Button variant="contained" sx={{ ...button, ...buttonText }}>Contact us</Button>
                        </Stack1>
                        <Image1>
                            <Image src="\assets\illustrations\User5430610 1.png" alt="" />
                        </Image1>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        spacing={0}
                    >
                        <Stack1>
                            <Typography variant="h3">
                                <Stack sx={{ color: '#000000' }}> About </Stack>
                                <Stack sx={{ color: '#6E39D4' }}>TalentCOCO</Stack>
                            </Typography>
                        </Stack1>
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            spacing={0}
                        >
                            <Stack2>
                                <Typography sx={{ ...typography }}>
                                    Our cutting -edge assessment platform is the solution for companies looking to  identify top talent in both coding
                                    and communication
                                </Typography>
                                <Typography sx={{ ...typography, marginTop: '10px' }}>
                                    With our platform,you can efficiently evaluate a candidate's technical skills through series
                                    of coding challenges and their communication proficiency  through a series of verbal,nonverbal and written exercise.
                                </Typography>
                            </Stack2>
                        </Stack>
                    </Stack>
                </BackGroundImage>
                <Typography id="service" sx={{ ...typography1 }}>
                    Our Service
                </Typography>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={8}
                    sx={{ ...stack, padding: '30px' }}
                >
                    <Image2><Image src="\assets\illustrations\Group 4.png" alt="" /></Image2>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0}
                        sx={{ padding: '0px 5px 0px 30px' }}
                    >
                        <Typography variant="h3" sx={{ padding: '0px 16px' }}>
                            Communication  Assessment  Platform
                        </Typography>
                        <Typography sx={{ ...typography, padding: '10px 16px' }} >
                            With our user-freindly and customizable platform,you can easily measure an individual's ability to effectively
                            communicate with others in English,both verbal and written.
                        </Typography>
                        <Typography sx={{ ...typography }} >

                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack> verbal, nonverbal and written skills assessment</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack> Designed to handle Indian accents</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Pronunciation,Fluency and Vocabulary assessment</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Body language,Posture,Eye contact</Stack>
                            </Stack>
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={6}
                    sx={{ ...stack, marginTop: '50px', padding: '30px 20px' }}
                    id="platform"
                >
                    <Image2> <Image src="\assets\illustrations\Group 5.png" alt="" /></Image2>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0}
                        sx={{ padding: '0px 5px 0px 0px' }}
                    >
                        <Typography variant="h3" sx={{ marginLeft: '20px', marginTop: '20px' }}>
                            Coding  Assessment <br /> Platform
                        </Typography>
                        <Typography sx={{ ...typography }}>
                            With our cutting -edge and easy-to-use platform ,you can quickly and accurately evaluate coding skills through
                            a variety to challenges and exercises.
                        </Typography>
                        <Typography sx={{ ...typography }}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Variety of question types</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Customizable  options</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Detailed analytics</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Automated Grading</Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={0}
                            >
                                <Image src="\assets\illustrations\Group 12.png" alt="" sx={{ ...image2 }} />
                                <Stack>Real-time analysis</Stack>
                            </Stack>
                        </Typography>
                    </Stack>
                </Stack>
                <Typography sx={{ ...typography1 }}>
                    Why Talent COCO
                </Typography>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={4}
                    sx={{ padding: '0px 5px 0px 0px' }}
                >
                    <Stack>
                        <Card sx={{ ...card, padding: '14px 60px 46px ' }}>
                            <Image src="\assets\illustrations\Wavy_Tech-21_Single-06 1.png" alt="" />
                            <Typography variant='h6' sx={{ color: '#020202' }}>
                                Fully automated and highly scalable
                            </Typography>
                        </Card>
                    </Stack>
                    <Stack>
                        <Card sx={{ ...card, padding: '42px 60px 28px' }}>
                            <Image src="\assets\illustrations\Group.png" alt="" />
                            <Typography variant='h6' sx={{ padding: '16px 20px', color: '#020202' }}>
                                Objective and fair way to evaluate candidate
                            </Typography>
                        </Card>
                    </Stack>
                    <Stack>
                        <Card sx={{ ...card, padding: '58px 60px 22px' }}>
                            <Image src="\assets\illustrations\User20943593 1.png" alt="" />
                            <Typography variant='h6' sx={{ padding: '24px 20px', color: '#020202' }}>
                                Intuitive and easy-to-use platform
                            </Typography>
                        </Card>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography sx={{ ...typography1, marginTop: '90px' }}>
                        Brands works with us
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginTop: '80px' }}
                >
                    <Image src="\assets\illustrations\image 63.png" alt="" />
                    <Image src="\assets\illustrations\embibe-logo.png" alt="" />
                    <Image src="\assets\illustrations\image 64.png" alt="" />
                </Stack>
            </Container>
            <Container >
            <Item sx={{ marginTop: '110px', background: 'linear-gradient(263.12deg, #FF48D2 -28.24%, #5F27BD 98.16%)' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginTop: '80px' }}
                >
                        <Stack>
                            <Image src="\assets\illustrations\male-student1.png" alt="" sx={{ marginBottom: '12px', padding: '0px 20px -5px 20px' }} />
                        </Stack>
                        <Stack>
                            <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '32px', padding: '0px 30px 0px 50px' }}>
                                Get your test results in minutes not in <br />hours
                                <br /><b>Try our platform today</b>
                            </Typography>
                        </Stack>
                        <Stack>
                            <Button size='large' variant="contained" sx={{ ...button, ...buttonText }}>Contact us</Button>
                        </Stack>
                </Stack>
                </Item>
                <Item sx={{ background: '#151515', boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.25)' }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                        <Stack >
                            <Typography variant='h3' sx={{ padding: '0px 20px 0px 20px', color: '#FFFFFF' }}>Talent COCO</Typography>
                            <Typography variant='body1' sx={{ padding: '10px 20px 50px 20px', color: '#FFFFFF' }}>
                                ABOUT TALENT COCO <br />IN SHORT
                            </Typography>
                        </Stack>
                        <Stack3 sx={{padding:'45px 0px 0px 90px'}}>
                            <Typography sx={{ m: 2 }}>Service</Typography>
                            <Typography sx={{ m: 2 }}>Career</Typography>
                            <Typography sx={{ m: 2 }}>Contact us</Typography>
                            <Typography sx={{ m: 2 }}>About us</Typography>
                        </Stack3>
                        <Stack4>
                            <Typography sx={{ m: 2 }}>For school and collages</Typography>
                            <Typography sx={{ m: 2 }}>For companies</Typography>
                            <Typography sx={{ m: 2 }}>social</Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Image src="\assets\illustrations\Facebook.png" alt="" />
                                <Image src="\assets\illustrations\Instagram.png" alt="" />
                                <Image src="\assets\illustrations\Linkedin.png" alt="" />
                            </Stack>
                        </Stack4>
                </Stack>
                 <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >          
                        <Stack4 sx={{fontSize:'20px',padding: '0px 101px 20px 25px',color:'#FFFFFF'}}>
                            <Typography variant='body1' >Copyright TalentCoCo|All rights reserved|Privacy Policy |Terms of Service</Typography>
                            <Stack item xs={12} id="contactus">{ }</Stack>
                        </Stack4>
                </Stack>
                </Item>
            </Container >
        </>
    )
}

export default StaticPage;