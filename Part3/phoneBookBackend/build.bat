if exist "dist" rmdir /s /q "dist" 
cd ../../Part2/Phonebook
call npm run build
robocopy "dist" "../../Part3/phoneBookBackend/dist" /e