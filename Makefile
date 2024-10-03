ifeq ($(origin m), undefined)
  m = "Update"
endif

commit-main:
	git add . && git commit -m "$m" && git push origin main
local:
	npm run build && serve -s build