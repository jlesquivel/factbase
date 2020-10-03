
rem First, get the locality-invariant datetime
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
rem echo %datetime%

rem Build the reverse date string YYYY-MM-DD
set rdate=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%

rem Built a datetime string YYYY-MM-DD-hhmmss
set logtime=%rdate%-%datetime:~8,6%

"C:\Program Files\7-Zip\7z" a -r "%OneDrive%\ProjectWEB\factbase-%logtime%"  -xr!node_modules\* -x!dist\* -xr!*\node_modules
