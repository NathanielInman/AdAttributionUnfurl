tar -czvf mweb.tar.gz *
rsync -avhtz -e "ssh -i ~/.ssh/id_rsa" mweb.tar.gz ninman@54.197.161.200:./
ssh -i ~/.ssh/id_rsa ninman@54.197.161.200 "mv mweb.tar.gz /srv;cd /srv;sudo -u www-data tar -zxvf mweb.tar.gz --overwrite;rm mweb.tar.gz;sudo restart node-httpserver"
rm mweb.tar.gz
