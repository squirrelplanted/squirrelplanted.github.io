# squirrelplanted.github.io

My personal blog for farm and garden things: http://squirrelplanted.com.

## Tree import helpers
```
cat trees.txt | while read line; do mkdir _plants/$line; done
echo ./_plants/1970-apple-* | xargs -n 1 cp info.md
```

### Tech notes:
 * Fun read about the Google Photos URLs https://www.theverge.com/2015/6/23/8830977/google-photos-security-public-url-privacy-protected
 ** I'm still not clear on what exactly causes a url to expire when they haven't been right clicked though
 ** Experimenting with simulating right clicks to make the links last longer
 ** Alas, it did nothing
 * I still don't know how long they'll last for, but the links I grabbed by inspecting in the google photos app have still not expired a week later
 * [cors-anywhere](https://stackoverflow.com/a/43881141) This is a sweet trick


Get non-expiring* links to all of the images in a google photos album:
 * copyTextToClipboard(JSON.stringify(Array.from(document.getElementsByClassName('RY3tic')).map(function(item) {return item.attributes["data-latest-bg"].nodeValue;})), null, 2)
 ** Doesn't quite get everything
 * https://stackoverflow.com/questions/4952337/quickly-select-all-elements-with-css-background-image
 ** Also doesn't get everything

Here is a link I got from google photos directly, this along with the top image in my WIP blog post both got copied out of google photos. I'll be curious to see if these truly don't expire. In which case I'll give up on linking to whole albums I suppose and just go back to manual copying, it's a super bummer though.
https://lh3.googleusercontent.com/8Fr3l_U5oqbxbuOgNVHLykN18jfbXkETBK97Ol031uRAg2ZWkfAls76XngpilrNQzdgJLlOFpL1vuL3s5QIcER-LX6XcvZA1QWt8n8c3aFiE6vnZYx-VpUl5EJ2MT54SpkDVXL26zHb9tB8mdxPBuAsUlDlYMceCtenPD1OOC08pOf2PI1hjj5IbDltcNXmz2x8htOyD6nQecgvh0VJWibVTq1RXYGJPygs41vX4Vpe9DwXBSmR6oMw5O6KL_sYUTHs5khlqOig76-m5v3w7lrKYYYmE28AaoW6Iw-NDNghB0aUf8oiWm7UJl3S2wEPtxeAArgPfN7gLk3f8435Kf7p7KR3idLKsP85odrh-wl8h2WXNx99INFNqzAgCxJ_XO3K2EwSiABlnXUmd3McUpmDZIlOYZoMT_V2ZvQPB8zfpi3Dzvk8U5vVO63Z_K6LHHmag4k9aH-96_pH8eTB4EPjnFUIMOmQHWLYa9l0ah7yBpbleOU54pA80CGFfdwAdxoN9aDK8BdrNMqr7un37pIKu7NYc-JQu6WC5e_rMKRm8QH_MPOkDodIgY2X-oKbzrl2CoDhD7WiXegO1SfZjhELUnCaocqc_1DZjKtdfrLX59MNooGxmQUBUsK4bBBA9Z1AIah5TLwwX0iaTxTOhmP4LHUUNcA04LHygzIbKhXm_PBhl_LOjGMBtP1S-Yig-ehlSM0S3xnyk3gUOM4uo4TzY

Should not expire:
https://lh3.googleusercontent.com/Ew8KV3vd2kFyQ6Z04Buy0EszLGi2Om7j3B15QPhiypP6uvUrVIP4MsCVgmacewktjaI7dhyxKitswm4eQEvdW2rxNOMEiNwlHY8cDE45aGV-XokkBo24np1D4-2xFur2Avnpn1TRT93fQUY__wMkuzRdMKjwIGaYQUl_OKA1dpQnfiT8e7YB9mjrBFGCaRU2eoJEF_De2gGBROUadb9why1atsSluxKGQDpbMv4P_-cNlS28zOAk5Np36B3FNwPuPj2Ft7I5kSX5b-gK9XFDqC9tpwr9dcmgBRj1IxNCbF7sCBBvtFKSTTB9mni-zqX4lbPL9Hx2r5nX4UvA0TGP8Vao9GAWjTSkTRff_eRRWCjjhvLOsbJLFaAcmOhMj30T1hEC--be9phGCakcm83W3BM6zFceMeI4Iun5DOelrh7ab2OQ5UtExcImGdtZIRn9oe3i05wkp3QevVxfa1Bdbu_Z5QYJWc6kS0Dbh4RG8x3GFnwvAHfpBJARXT8V50rCHhhKkY5GJeKOX9hb_mQr4fQLhQniAFhrOmzDNy3WfneiohYvE1TBSM9XSfHTMVNrx1RxK57KdCNTHB0Hz11LbGPnVCtuWLgZIx32IfLuFIRl9zjKHHmcs0l6lZD4c3uc8owxtjwWcStiJf_Rk6bE2ar4HY8qzeYsrti0-LI6UnXMNtZbIEMda9dWfUggLkwhBDaP7Onp6g4YZLhPCkeO8GktwQ=w408-h306-no

Expected to expire (pattern in the /lr/)
https://lh3.googleusercontent.com/lr/AGWb-e5k7xxQSNxliT-BAhF1XkxK8Wl52lnF4980jsXG9RhHMN0b0xGV6qWMnrS-yFEVTBjiC3_06FhrHV1m8Yuw-pbpL2wfFpJvJzT25w8O_cGSv6lH1QlG5L1dNV5VtyYWCVrI6ZRv1uI2uL1dDW8pkZu51mxyNyfRQiBZbuP_UyEPwiicmjykpzMC4I2VuyU2wPOPejlcH_cuNZ3KmBxJNO7GxzzpH1_zfTv0iBwFY95ox4WHPU_6z38E9jOADFhE-5bjnTiRc_vQoq49pFnluQKBBIu4EN7Eh2cyTnZPpUDCaW-s7A2H61BKGBssdXU2s7wKWz-MUMGCd-Vdjk4mIVXQhyPOmRtD98czCo8C-uQx_oGk32K3P24VIbqYa-Ctg2u6VDnRDxDia7rYu5JSZarKeHf2-wcHJ1drz5a6YqB55p4s5Awmh4cErkN_f3bA-buEhkdQyJLVLYXt1bUMqU6XIVLk04g1Fa7rdEB0kc8atDlAKln4y3syNlrGUXslU4gqv95xKCylyctp6Rwo4ETSLkJJATXcfl1VggRzCU7MpPvFDWnoQI0mHq41iE6P4jIk1pdbL_y2S_hKDbkW4Hc4R61hnldMZGr0mJuBFgfwbv4NFZXkHWdLDkTNvYsjILaMvhnRbOX2PX1gRvLhIimWkx6ojMid4HQ7aOvrtJd_MFntx3jqFFwm_Qls5gSWl4VeeoxuC6Aqj8-LwcotdxTB5UoJRP9Zmaihmu8jlDYgFlcnH6wSZuDHfnltzkck-jDfFcLEXmbxvE20lbn60N9ReWuBNLDYHSr0-zUfGvuemD-qHs0jVq3ciz79UKGyHw2yIomanDyNPZFSa6r59GVmIpYfKwmeWx12SyyuXxJ6AmNJ7W8gAxohrbWXQNr6F8wb6JvaxW5VLndJyCeYQc_yE4dV8m8
