tar -czvf proxy.tar.gz *
rsync -avhtz -e "ssh -i ~/.ssh/id_rsa" proxy.tar.gz ninman@54.166.101.180:./
ssh -i ~/.ssh/id_rsa ninman@54.166.101.180 "sudo chown www-data:www-data proxy.tar.gz;mv proxy.tar.gz /srv;cd /srv;sudo -u www-data tar -zxvf proxy.tar.gz --overwrite;rm proxy.tar.gz;sudo restart node-httpserver"
rm proxy.tar.gz
