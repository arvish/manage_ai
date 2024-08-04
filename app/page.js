'use client'

import * as React from 'react'
import { Box, Typography, Button, Paper, Modal, Stack, style, TextField, AppBar, Toolbar, IconButton, Container, Avatar, Tooltip, MenuItem, Menu, createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import { Roboto } from 'next/font/google'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query, 
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const pages = ['HOME', 'ABOUT', 'CHEF AI']
const settings = ['Contact Us', 'Logout']

const Theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Use Roboto font
  },
});

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(145deg, #2F4F4F, #333333)', // Slate black color
        color: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        textAlign: 'center',
        py: 3, // Padding top and bottom
        mt: 'auto', // Margin top
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Typography variant="body1" sx={{ textAlign: 'left', px: 3}}>
        All Rights Reserved &copy; {currentYear} 
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'right', px: 3 }}>
        Made with ❤️ by Arvish Pandey
      </Typography>
    </Box>
  )
}


const Home = () => {
  const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
      setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
      setAnchorElUser(null)
    }

    return (
      <AppBar position="static" sx={{height: '80px', backgroundImage: 'linear-gradient(to right, #ff5722, #ff9800)', fontFamily: 'Roboto, Arial, sans-serif',}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{height: '80px'}}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Roboto',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'lightgray',
                textDecoration: 'none',
              }}
            >
              MANAGE AI
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{fontFamily: 'Roboto, Arial, sans-serif',}}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MANAGE AI
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Arvish Pandey" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{fontFamily: 'Roboto, Arial, sans-serif',}}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
  
  const HomeBody = () => {
    const [inventory, setInventory] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [itemName, setItemName] = React.useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const updateInventory = async () => {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    }
    
    React.useEffect(() => {
      updateInventory()
    }, [])

    const addItem = async (item) => {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
      } else {
        await setDoc(docRef, { quantity: 1 })
      }
      await updateInventory()
    }
    
    const removeItem = async (item) => {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity === 1) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, { quantity: quantity - 1 })
        }
      }
      await updateInventory()
    }
    
    return (
      <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
    )
  }

  return (
    <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
        }}
      >
        <ResponsiveAppBar />
        <Container>
          <Typography variant="h1" sx={{ mt: 20, textAlign: 'center', fontFamily: 'Roboto, Arial, sans-serif' }}>
            Welcome to Manage AI
          </Typography>
          <HomeBody />
        </Container>
        <Box sx={{ flexGrow: 1 }} />
        <Footer />
      </Box>
  )
}

export default Home
