import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

const CustomBottomSheet = ({ open, children }) => {
    return (
        <BottomSheet
            style={{
                backgroundColor: '#111'
            }}
            open={open}
        >
            {children}
        </BottomSheet>
    );
}

export default CustomBottomSheet