tar -czvf proxy.tar.gz *
rsync -avhtz -e "ssh -i ~/.ssh/id_rsa" proxy.tar.gz ninman@54.166.101.180:./
ssh -i ~/.ssh/id_rsa ninman@54.166.101.180 "sudo mv proxy.tar.gz /srv;cd /srv;sudo tar -zxvf proxy.tar.gz --overwrite;sudo rm proxy.tar.gz;sudo service node-httpserver restart"
rm proxy.tar.gz
