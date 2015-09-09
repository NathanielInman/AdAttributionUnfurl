tar -czvf mweb.tar.gz *
rsync -avhtz -e "ssh -i ~/.ssh/id_rsa" mweb.tar.gz ninman@54.166.101.180:./
ssh -i ~/.ssh/id_rsa ninman@54.166.101.180 "mv mweb.tar.gz /srv;cd /srv;sudo -u www-data tar -zxvf mweb.tar.gz --overwrite;rm mweb.tar.gz;sudo restart node-httpserver"
rm mweb.tar.gz
