  for server in `cat servers.txt`;
  do
    sshpass -p "Your Password" ssh-copy-id -o StrictHostKeyChecking=no <user>@$server
  done