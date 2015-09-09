tar -czvf proxy.tar.gz *
rsync -avhtz -e "ssh -i ~/.ssh/id_rsa" mweb.tar.gz ninman@54.166.101.180:./
ssh -i ~/.ssh/id_rsa ninman@54.166.101.180 "mv proxy.tar.gz /srv;cd /srv;sudo -u www-data tar -zxvf proxy.tar.gz --overwrite;rm proxy.tar.gz;sudo restart node-httpserver"
rm proxy.tar.gz
