rootPath="$1";

function printCommit {
  for repo in `ls $rootPath`
  do
    repoPath="$rootPath/$repo"
    if [[ -d $repoPath ]]
    then
      (cd $repoPath; git log --since="2018-01-01" --pretty=tformat: --numstat | awk -v repo=$repo '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "repo: [%-40s] added lines: %-8s, removed lines: %-8s, total lines: %-8s\n" ,repo ,add ,subs ,loc }')
    fi
  done
}

printCommit | sort -n -t : -k 5 -r 
