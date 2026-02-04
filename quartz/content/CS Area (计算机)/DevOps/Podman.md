---
title: Podman
tags:
  - CS
draft: "true"
---
## Definition 






## Usage





### Issues
`There are no spaces left`:

*For example:* below is a system that only a very limited space is available
```bash
ROOT:/ #>df -k /SYSTEM/var/lib/podman/storage
Mounted on              Filesystem             Avail/Total         Files         Status 
/SYSTEM/var/lib/podman (BCZ.PODLIB)            31/3673440          4294878554    Available
```

**List all images**
```
###### Take a step further, how to clean it up ######
ROOT:/ #>podman images
REPOSITORY                   TAG         IMAGE ID      CREATED       SIZE
<none>                       <none>      22fceec582d4  16 hours ago  835 MB
localhost/usergolang         1.24.0      c955a5867ff6  20 hours ago  1.22 GB
localhost/golang             1.24.0      4671b27bfdbb  20 hours ago  1.22 GB
<none>                       <none>      557f93b7238a  21 hours ago  1.22 GB
icr.io/zoscp-sandbox/golang  1.24.0      52e07e3ddeb9  21 hours ago  1.22 GB
<none>                       <none>      23a0c5da3368  21 hours ago  665 MB
localhost/oeftools           latest      aa77ca9c28a0  3 weeks ago   513 MB
icr.io/zoscp/oeftools        latest      aa77ca9c28a0  3 weeks ago   513 MB
localhost/zos                latest      83cc09d62ed8  7 weeks ago   208 MB
icr.io/zoscp/zos             latest      83cc09d62ed8  7 weeks ago   208 MB
```

**Remove images**
```
ROOT:/ #>podman rmi 23a0c5da3368 557f93b7238a 22fceec582d4
Error: 3 errors occurred:
        * image used by 038ff203add289f85ea9721195ae7f3a8028fb373fcee59b79f00f7c2de707db: image is in use by a container: consider listing external containers and force-removing image
        * write /SYSTEM/var/lib/podman/storage/ufs-images/.tmp-images.json1920390160: EDC5133I No space left on device.
        * image used by 4b8829ccfbdf3af1753759ca88dfc0a5b3a8cfd7245fccc240afd3be3cca9653: image is in use by a container: consider listing external containers and force-removing image

# List all external containers (to find out what are using those images)
ROOT:/ #>podman container list --external
CONTAINER ID  IMAGE                                                                                  COMMAND     CREATED       STATUS      PORTS       NAMES
53aa1a187821  icr.io/zoscp/zos:latest                                                                buildah     16 hours ago  Storage                 zos-working-container
b7b17b811848  localhost/8096790929ccb67bc6f81f35ed72ed022c76ead5a7aa7535258bef0a7076a600-tmp:latest  buildah     16 hours ago  Storage                 9358b3e721f4-working-container
038ff203add2  localhost/dfce6796e96152b1605db983305ac92c339b9c85cb05f9b4981ef2e8a76a4df7-tmp:latest  buildah     16 hours ago  Storage                 23a0c5da3368-working-container
c95fcd593182  icr.io/zoscp/oeftools:latest                                                           buildah     16 hours ago  Storage                 oeftools-working-container
4b8829ccfbdf  localhost/fb2e280236cc343717192866cab5a452245701cb94621508496ba7a17663e3d5-tmp:latest  buildah     16 hours ago  Storage                 22fceec582d4-working-container
```
1. You can notice that delete images requires some temporary space (may act like a buffer or so) for podman to perform. When the storage is corrupted and no normal deletion can be done, you just need to reset it **HARD**

**Hard reset the podman storage**
This will remove all the images (even if some active containers are using it)
```bash
ROOT:/ #>rm -rf /SYSTEM/var/lib/podman/storage/ufs-layers/*gz                                                          
ROOT:/ #>podman system reset -f                                                                                       
ROOT:/ #>echo $?
0

# Check whether the images are gone
ROOT:/ #>podman images
REPOSITORY  TAG         IMAGE ID    CREATED     SIZE
ROOT:/ #>
```
