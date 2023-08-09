---
title: "Husky"
date: "2023-02-03"
---

幫助使用者在commit階段做一些預先檢查，例如要通過測試才能commit, 程式碼排版, lint檢查等等。

## 安裝
```shell
yarn init # 產生package.json
npx husky-init # 產生.husky
yarn install # 安裝husky相關套件
```

### 插入shell script
```shell
npx husky add .husky/pre-commit 'echo "pre-commit"' 
# 在.husky/pre-commit檔案插入後方指令。也可以直接修改pre-commit檔案

npx husky add .husky/commit-msg 'echo "commit-msg"'
# 如果原本不存在commit-msg, 產生一個新的.husky/commit-msg
```

在commit時,就會依照不同階段執行`pre-commit`,`commit-msg`等動作
```shell
git add .
git commit -m "feat: add pre-commit hooks"             
pre-commit
commit-msg
[master af64edc] feat: add pre-commit hooks
 1 file changed, 1 insertion(+), 1 deletion(-)
```

中斷Commit檢查
```shell
exit 1 # 執行到這行會跳出,不能commit
```

## 怎麼運作的
1. husky install
	* 在`.husky/.git/config`塞入`hooksPath=.husky`  (`git config -e` 或是`git config --get core.hooksPath`查看), 將git hooks和husky做連動
2. 在`.husky`目錄下會有一些檔案例如`pre-commit`,`commit-msg`
	* 對應到不同生命週期執行對應的shell檔案, 名稱好像不能自己定?, 要依據`.git/hooks`裡面給的範例命名, e.g. `commit-msg`,`post-update`,`prepare-commit-msg`,...
	

## Reference
* [typicode - husky](https://typicode.github.io/husky/#/)