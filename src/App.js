import { Route, Routes, BrowserRouter } from "react-router-dom"
import RootLayout from "./_root/_layout"
import AuthLayout from "./auth/_layout"
import MessagesLayout from "./messages/_layout"
import { Home, Create, Post, Profile, UpdateProfile, Search } from "./_root/pages"
import { SignIn, SignUp } from "./auth/forms"
import { Messages, Direct } from "./messages/pages"
import StateProvider from "./context/StateProvider"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:post_id" element={<Post />} />
            <Route path="/profile/:user_id" element={<Profile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
          </Route>
          <Route element={<MessagesLayout />}>
            <Route path="/direct" element={<Messages />} />
            <Route path="/direct/:room_id" element={<Direct />} />
          </Route>
        </Routes>
      </StateProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App