
#PYTHONPATH="${PYTHONPATH}://home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/HeadlineGrabbers/:/path/to/another/cool/python/package/"

set PYTHONPATH="${PYTHONPATH}://home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/HeadlineGrabbers/"

export PYTHONPATH

python /home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/ProcessIndex.py /home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/views/index.tmpl /home/ken/code_line/meyenews/Server/CronJobs/ProcessIndex/views/carousel_section.tmpl /home/ken/sites/meyenews/index.html

