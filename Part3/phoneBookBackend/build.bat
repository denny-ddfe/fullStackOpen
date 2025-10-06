if exist "dist" rmdir /s /q "dist" 
cd ../../Part2/Phonebook
npm run build
robocopy "dist" "../../Part3/phoneBookBackend/dist" /e