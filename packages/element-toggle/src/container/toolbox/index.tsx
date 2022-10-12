import { Element } from '@bento-editor/core';
import React from 'react';
import { styles } from './index.css';

const toolbox: Element['toolbox'] = {
  Icon: () => {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M10 19L3 12L10 5V19ZM14 19V5L21 12L14 19ZM15.5 15.375L18.875 12L15.5 8.625V15.375Z" fill="currentColor" />
      </svg>
    );
  },
  Thumb: () => {
    return (
      <img className={styles.thumb} alt="トグル" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdwAAAEOCAYAAAAjVabRAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC+KSURBVHgB7d1djFTnnefxp62RoDrS4KEt2xINeLLu5ooXzcpNeiXbBNaWLeMoRoaLYIe9IFqjGCUhI2tWWON1YrKRJ8ETgWWkYCk4mAs6wppxR7bsQMC+IGBpQ8Pc0Hg2xt1IJqIxrBSquZma5/dUPcVTp8+pOqe66jRd/f1oarqp9ypH/Tv///NyukxKpVLpTvvjm/bysL2sspf77OVOAwDA3HHNXj6zlzP2ctxe/qWrq+tamgd2NbqDDdr77I/v28sWQ8ACABD1K3t52QbvZ/XulBi4lYr2JVMOWwAAUN9r9vKjpIo3NnArVe3vTbltDAAA0vmTvayNq3bviF5hw1bjs4QtAADZ/a29HKtkaY2aCpfKFgCAlphS6VYDtzJm+0dD2AIA0AoK3b/zY7phS1kTpO4zAACgFdRe/kf/D1fhVlrJfzIAAKCVSvbyVbWWfYX7vw0AAGg1Fbbfc79Uxm6/NAAAoB2UsV9VhftNAwAA2sVtjazAXWMAAEC7qK38kAJ3pQEAAO20SmO46i1zUgIAANrnSwVuyQAAgHYq3WEAAEDbEbgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkAMCFwCAHBC4AADkgMAFACAHBC4AADkgcAEAyAGBCwBADghcAAByQOACAJADAhcAgBwQuAAA5IDABQAgBwQuAAA5IHABAMgBgQsAQA4IXAAAckDgAgCQAwIXAIAcELgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkAMCFwCAHBC4AADkgMAFACAHBC4AADn4KwPk5EZx0hRvTDa+Y5cxPQvvNM2auHrNjF74vPrv/r4l03q+6dLnHh+/XHNdf99SM13Hjp82Z86NVv+9ZfOT9nMuqLnP8Hsfu9e/y17fu+ielrwugOYQuMjNyNlRc+DQuw3vVyjMN7te+q7ptj9l58t7zeDASrP+8QdNGmM23MLX2bZ1YzVwFVJHT3xisuouzDM7X9hqmqGw3b33YPXf+nyv/fSHZroUpKOfXgyed96U+5w8PWIPQK673xXGu1563gCYGQQucqFwSKto7/tbW5lt3PCIOXzkQxcYw+9/5MJjx/Znp1RxUT6ovTCIFHaqgDNr8JpZdMcEYxouYG3lrsf39t4T87y1n1uf04et9N9PdQvMJAIXbaWQGDryO1uJfWZWLl82JSzDQAgdPXHaBUbYMl25ovx4Xd+qFnH//UsSb9N7S3p/M6FYvGn2vTnkftf7bhSgYVtdBlevMABmDoGLtlEwvrH/N2b8Unn88pgNUY0zDg6sqN6+69X9NpRvun+rcitXoOWQC8NWAbPpqUfcY3bvOejCRi3m6Qbvlm89mXibWs96z7OVugKhA28PN3zMyuX9ZpPtLABoPQIXbaMwXLWivxq4cuDtd83ExHV3/Rv7h6phKxs3POoqWAVqSCH8nB2HVbWsAFcgnzx91l1etOOqmgzUrJ0/et3kLfzMWUxMhK3wrprvVU6eOuva8eoEjF64OKU6b6qVDqBlCFy01frHHnI/NVvWU+V17MSpmuBRteorX43dDtmxW8+P6er+YcjoMdMJ27xEg6+YYTw7SThZyvMTxTS+G61u02p2fBlAYwQu2k6hq2pX1a0XDVsfzLLu4QEXSmFIH420dqOPEc1mjhtz9RXz+semtqB3/eN3TZJWtZTjKku9z56ME7GiFW0SfW/h97B2zYCbUDX83q0QXv+4PxBqLpgBZEfgzjKqXMIgmo640GqbUrl6imunnjx1zl3SUlD5ani68mgpxx0EKDyzBu6VlC3hsPrVa+gAJgxWXaeDj8NHPjAA8sNOU7OMAjLtetS6z5NT2GosURWm2p1h2Cp8ffuyvHxl6iW8b0gBtvPl18vjwRnHJVvRzs0qLnDPX7hoshq/9Ofq7zu2P+NCM7T7pz+c8l2pklXAhiGs2eIyEkxKA9B+VLizUNy4aKbH5xC2quB27/l1bEWrGcdbNn8j8fYoTZjSZ42OW/qJU+Wgme/GfvVTG18MvXNrDFizbjXW69epaqZ0wQX+fJNGeQ1xl2lW3Hhr2vZw0vPo84xGQlufR+uU/feqVrI6AdrsIwz9dfb6uElVANqLwJ2lmg3dvCpbBULvontrQkLV1xO24lKLU7LserRj+1IXrmqNhkGhQPHBuapSual9HX0vWkbkx3I16znr5CAFmIJL4ftihh2nRhMqWX0veq60oR9+j4uDg4cofVZ9x5qxrApYHYBw/FvflyrepLHbnhZu8AGgFoE7i2UN3VzHbCuvt3tPOShWLe93QantHXVplsJycPXSaoWmai2tuEqz3XSQkEQB7icvNaIDBh2gpJnkpFD1ByL7KsuoPL2eQrje+wLQHgTuLJc2dPMOW1FIqH2rn2rh7viHn5tWUIWpEFGA3u7LgqITmDRL2l+nWdB+BnEaery+z6RtMv3JDAYHltuDkpVT2vDljUIW1MwWVzATvkA+CNwO0Ch0ZyJsvVbNJo7KOlNZIfXc1qdduJ05e94cC05goO+nHfsMq60b3ctY7WAfgprAlaXK9XxAR8e/D1fGrTVGrv8thGtxyzOTH3KfPQxYnT0o/Hd3d8EAaA8Ct0Mkhe5Mhm09G596xO02lcbR49NbD6vHX/j0M7P7p3/vQvAPkYouy7IkbS+Zhtq20c0ntJexKnJd78Ny+P2P7fewLFWlrrMOjV267AJ79NPPE2doK0DDoFfYajKV29c6mEzW407Zd3fNYwtsfAG0DYHbQaKhe7uGbVXJ5GLk3Hn3U5Om4sZxsywtulEsprpfdPMJhZuvotdqXez7tw6MfmVbvFrm06i1vHtv/Vndfp1zdPaxP0+uP/OSp600izea22YSQHYEbocJA/Z2DltVWmG11Qqq4DQhK2lMMjqeKmEA+ZnLYaiVz04UBGdP45MlqE0cfQ9h21jjtqrY/etoiZC2slQw1hOd9R3lKnj7uuEY7ZbN613Q6z0di8xW1kQ2tZhDrToLE4Cp2PiiA7nNMW7nyrYNFLaalKUNNqKhFG6yoZ9ar6uTyffff1/1PgrWnS98p7ophL9O475ZaPb04ciBhMZUw/FmVbJPRMZty0ue6k988+1ffQY9pwIzSq+z9uEH3O8K28GBlS7QD0dayf4A4CprcYHcUOEiF37v4Og6T4VB0vilximj56v156iNPo9CLFqNitrqauEqhFX9umUxE+VT/PnNJ/wYpzbMCCvTuJZrvbavxoeH3qndLrE8s/gbU+6rtch6P+HBgcZ2NZFqY8Lp8fr77jOLe+91p9DzeyOfidktSp9R48KqbMunM/z1lNv99xfdLpJ1uED7ELjIhf6Q+40u3IQiW81pbFVtVQVAdJawWp3liUHX3W1ab9toYpHup8BUBahKNQwWbYrRPX++a7dGW8sKWwXdW4f+tXp9Ust1YUIgqWV7OKZF7k85GEctZIVheJCgTSrO2O9FY7rR9m5cRRtHYazvIm63L7/7lBe+diHl8iQAzSFwkTv9YS/vtFSZqWvDVztJhXyl6c99m2bpjJa49PQscBVtWImq3awT3UerXwXYt23oqdJUZerfjwLSV5lhOJd3qKoNJT33WzbE4ypNPUe9kPRhv+vVX9aEot6nKnANC2hmczN8tR0+rw5YorOswy0mF0dmLANoLQIXbeO3QoybiKP1qD4AFWoKXV8JqtoMN9aP2zdYVClrEpOv2JLW5Sokt23daF6xoStqUyvA3RId+7rhZCKF6pZvPekecyPyPqKBVH7sqdiZw2pl+y0s6/GhG61E9d1oPFoHG379cFqajRxdRqXXUfjrv8nCyn8Pfe/hQYgmZQFoHwIXbaOqL+12ivVOmK4qzJ9cPSo6ISmJwtUvj9Hvx45/YvbtH5pSAbo27N6DCc9RG0haIhQXtn6yUlp6XU3YiraXpb9vSaaw1ff9h9MjNdf5UD95aiS27e0t62v95h8AbmGWMuYMBbPCTe3acPMJ0dimxk3r7TgV3bd5kx2fDe+vYNO2k1nCNnysQjEcp/a7Q6Xlx7s1buyVw3xreR1wnUDV7StTjhEDaA4VLtpGuxa1e9ZroZBtK0LfXvbVpN+f2AenKua4ZUVPBBOwQjr1n1rVCmydnad7GhOPfGDrYEDt6kbrcpP2VNaBxdj4F6Y4edPt6OXfU1xrX5+tz372TUFIA2iPrpJlgDlGrWNtkxhtR5eXHYUnv5/vZibXC9J6S5ualebUfdHtHf1yoUbPWwyCmo0ugNyUCFwAANqvxBguAAA5IHABAMgBgQsAQA4IXAAAckDgAgCQAwIXAIAcELgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkAMCFwCAHBC4AADkgMAFACAHBC4AADkgcAEAyAGBCwBADghcAAByQOACAJADAhcAgBwQuAAA5IDABQAgB39lALTNjeKkGTk76n5fuaLfdBfmmzNnz5ti8abp71tiehbeaQDMDQQuOooC7g+nzpqCDbZW6+lZYPrvX5rpMQrYA4fedb/v6nve/Xv4/Y/M+KU/mx3bnyFwgTmEwEVHUeV4+J0PTTusf+zBKYG7e89BM3H1usmiu1BwP/ftH7IHBoXE+xWLRbP7p39vAHQGAhcdZ3BgufupMOsuzJty+8nTZ11Irly+zCxedHfD55u4es397OmZWo2uWt5vxi59UbdSHX7/48r7qX0vfTa8496fp4MHAJ2DwEVH6Vm4wGzZ/I3E29Vy9gH45OMPmt5F95jp+NrqFWbhhTvrBqcx5dfrjrS5Fdb1WtSF7ta3xQHMHAIXc8rohYvup4J5umErqkL3vTnU8H6LY17rwKHhuo/Z9dLzU0IawOxF4KIjHTt+2lWzUaOffl79ffi9j+o+R2/vva4KrUdt4hdf2DqlXVx9vQufu0lTC2Nazps2PJIY+mp5F+pWzQBmGwIXHenMuVEbrhcTb1eg+dZykrUPD9QNXAX6+Pjl6qSpov23rtO/b9jKV2O/Vyvjv6tWTH2eKxM2VOcnV7Cabd3ft7QllTiAmUfgoiOtXfOAGbTjq6GRs+ddEKudvP7xhxIf6+/X3aDCVHt635u/qf5bz6uq9C5bzWoSlQJXwavrBwdWTHn8sROnTSNbvrWewAU6BIGLjrRq+bIp1520FaNoolJcAHoTE9dc4Dai6vO5rU+78dlwlrKCWDOhxy9ddqG9Y/uzLnz963tah1tv0pQeU2AMF+gYBC5uG2rPqiWrIGs1hZdvMderbrPQhKa4YJ/48roZOXfehukSN2NaFa5vYev3jXbsVtV3o00v2BQD6CwELm4L2kDCB6JaqKr+WjlD9+jxcvtWIajQa5UDb78bu/FFOSy73O3iJ3CpxXzs+Cfu92jFG6XqdputoAF0BgIXM07BE05wUitW161bM2Cy0GM0IziuMtSuTf65d778et3n8ffVGOvJ0+dqrtdEqrBCLk+Suhb7PHGzpIt17h/FkiCgsxC4mHHaqSkq63aJtY9NDjRVmDdS7uCU5r7btm406d7TdRv0e111rfW1AOaerpJlgBmk6lYt5dCWzU/WndgUx1eU7aoM6z2/Wscat623N3J1i8gGY7NqqdNKBjpOiQoXM04zdTWR6OSpEbdz01rbSs4attLuFmy951flqmq47/77YvdnVlgfO/GJG5f1ez1Hqd2t2dEaZwbQeQhc3BbW2bFRXVpJVbMCrnsaOzYpRLPsuawlQnGB6Vvkei9JS4FucLICoKMRuOhY9XaaymLdmgdS31fnuq1Hwbt770EDYO4hcNGx/PpXjQc3sxTIL/nJsh5241OPxG7j6ILWVtx6H1ryFGfk7GjbzuULYOYRuOh4auG2cu1tHD+hShOnNBYbVQzW4Q6/F7+Hc9rlQgBmJwIXaIGurq7q2G294Gy0DlfPwXlwgc5E4AJNUlXrZy6rlVxPuA5Xeys38xoAZjcCFx1PJyMwbVhurjFX7WyV6b3Y4H3ue7tS319nCxpcvdIAmP0IXHS8ds0KLnTPM72L7k5dgfqT32dZZ9vdXTAAOgOBi47l175mCcWQD8jyhKepk650pqC4swUlvZdmWsoAOgeBi463beumpmYp+9Zv3EkIsrpROSECgLmLvZTRkRSSfnlOvZO81xOeLnC6E5f0fkYqJ7VvZttKALNeicAFAKD9SncYAADQdgQuAAA5IHABAMgBgQsAQA4IXAAAckDgAgCQAwIXAIAcELgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkANOQA9Y1ZNUdrn/m3Umrl4zExPXTXf3fHf+3jhj45dNsThpenoWmJ6Fd5os9PVk+V6uTFxzD+r+yvxpn0u4ntELF83ChQvMXT3ZPg8wEwhczHlXbFi9+PLr7vce+8d75wtbM4VE2jNK6yT0X7GB+Bf7s3v+/FT3TWv0wufmwKF3Tf/9S8yO7c/G3mffm0M2mK+bbVs3ZgrcM2dHzdA7H5gfPP9M6mB7be9B91obn3rErFszkOox+syFOt9LV0ziD7//sRn99KJZ+/CA2bThEQPczghcdIzh9z6qe/uN4s3YP8qv7TnofnYX5rmQ+O17H5uNKf946zX1Rz+tfb/YaX7y6n73Oo2sf+whs/7xB02rKGT1ugX7ObMYfv8j97gXf/S6DdBHbYA+kPqx3Rlea8QGuw4akkQPJhTQClv5b6tXGOB2R+CiY4x++nn1D3CSaOAO23BVmKiy1R/zXa/+0hw9cdqG0vxMYadg8VXxlUqY6jl9UXYlErBdCf3ZsFo+eXqk5j2ofXrm3GhsiI1fuux+6rMkHXio7eye99RZ91xROiDpv3+pWbWiv+Z6VcRDRz5wr61KV23pVh4IhPS99PzNgsj7mnTvLVqVK6BF33NSGx24nRC46BiDAyvMYKXSGTl73gWEAsRfNzFxreb+x46fdtWbKGz1h/vbm580+/b/pnp92mBR63Rw9Ur3+25bMSv4/XPKzpf3Vqvaei1rvafD73xYPQAI6fHH7MFAPS5wG1TcJ0+fTbxNYR4NXL2X52zo6jvRAUr0uzljv2t9nv6+paYehfzRE5/YAH869nb9dxqMqVR1gBBX+frPsf7xhwwwGxC46BjhH2uFqwJXYaEgjtIfcQWbKDh8MK5avsz9Oy5YWkXhpGpTr/GEfe67KpWbJjX591QeZ62t9DTZSWOVSRVuvc8rCigFsm6PPrfX23uvSaIWt+h9m65bpfgxG6I6wKg3Xqsqdffecute99WB0HTo+/PdDB2k6L9nGquW95u1KceUgVYjcDHnRMPUB4kXBovuN2bDbOOG/14NxjhqeV65UltBK/RL/xE/o+rA28MuMFxQbXjUzeh969C/utu2bF4f2yJVSCUFlQLHB66v+Hx72rev1XJ3gWsPTJoNPH03em86MPHGL33hfi7uTW7rugrYvqY+r77XHdunF7gu9CvGKu30NDQODMwUAhdzhmYH/+bI79zYqETDVrOVf3/8E1d16nqN4w4d+dCMnDvvQkXXfc2GVdzw65CtTIcq1annK7o4z9m2qsZaVR3u2z9UvV5hOziw0mSlcdVwXFht3n1v/sb9rolaoslSd9lALtqDg7TUBo62isOwHbPfy43K8zUaR9X3vXtP+SBDFWrWpUmePptvJ+t79O15dQj030D/3ZLa1u1cogQ0QuBiTlBlt3vPr6vjqHFhq9nKuv2KWzrztFln27fLbFX2xv7ychqNI6riVbs3Gi6qnHybdsRWmgqhlbZ96du//jpPf/g32cpWYaZQ1/PrOVcGYZaF2qRhq9QHS9g61vvOQm1qHTSoBR22vmvuM/5n93Oxfe+NwsxX6L7K3WLHy6PUHlalHvKTvfzv/sBG7ysMf1Op6PWdT7dlDbQDO01hTlDw6I9weTLSMzVhq8rIh61uD2cyKwQ1ecmPi+o+Go+M0u1bNn/DXXoXlcdBFaj+ukJCGCkw/OQqBZwmbN0uzlfGSFVN6vuJGyc9Y6t/STtL2I+z6znjZpT7pT66XPj38uXql9dd9a4DFrXi/X8nJkthtqHCxW1jbOyyKU5ONpztmkSBpfD0v4v+OPug0IQera8NKzE/K1jK4frMlEpNf9xVjel9qcKaTvUUvseQ2siqnvXcYbD19y2ptl71WLV4Cynaor6SV0ilnVAkmpjlP58qfB0QvGY7A1cqFb6eN5xEdqESmqtWpKvMdWDiliUljOX6g5m4CVi6TZ0CtffduLctafW/mcWL64e9xtbbveMVkAaBi9uCX0ojScHXiIIsunzEV0ui5+wtlP84K7j8LkWiduymp25Vtn48N9wAI2n2r0xc/f/Vta0+NMbt+/FLkYqV6+LeY8hP5vLC7yKcxZyWXrfe60Wtf+zBmgMKHWy88tLz1SVBGv9WlarrFZwKdB0AqH2e+jWCsdyj9jsON9LwBwpxO1rpO9B/A9+pOHzkAzcGrvecVO36/129qKVYiwhczCwCFzPOVzyeKjldty7j8g1VZ/rjK34TjPKM2nIY6A92NGg13vdt2/JdFQRG3HhuI9GglDfeHJpyXaF7nnutcLenuDFfvbY+gwLTH3jEPTaJf7zCcNXyPpOGJlP1JGzd6Fvwqrb9uLD/zKsyhO1fbkyWN9ewj/EbaSyzVbxvSfsJXfU+o3/98UuV8eM6S5n884yNf8HmGJhxBC5m3FhlWUkozdaHUeGyGc0AVqhqMk9Y/Rx4+113vYLNTTRy61pvVT7adN/vAxwdz42jdauDA8trZtz69a7hmlkFarFYdC3aVZGJUdoUo7zt5KM1G2VI+N7jHptEBxaa8KTX1xhyK4Tj3jog8v+NBlNuq6h2/M6XX3dVqlrCbg9k+98gDEK/xChNON6w36ekCecxG86DBphZBC5mnMb/1BoM1VvTOR1qEd/aQKK2xagQUcWl8NMf/LjNJ6JUqUUrPL/eVRV6o8fH8dtNup2zBm7PPYJ9davZ2WnHtP3aWQWtb1WH/w38Fo4SnTym23TwFM5s9hVuvXBeXJnA1swBHNBqBC5mnP5gKwhPnhoxk/YP7tdtULUraPQHPrrRhdqcv7VtZr9togJUWzyGYfDKq/vdxKYsG/c3Q2fmUZilnYVbSnHevFKDG7tSnnfvRtDe1ntTF2GTm7xUnnx23h5oLF50t/u3H7Pu7i64n6puo1sxRg94xoPJZHEzmBcHwerHyxstR+rtvTvx+YC8Ebi4LWhGrC55UtD+3lbWx06cqlZWCv7o+zh85EM3rhwdb5Q3bCWmtm1Yyfp1o0dtCNW2lCfLk37qzML2lePGoL2c5JVXf2muurP/FBLv487yUzn1YPzt19ykrDRVqtYLa1cnjWnrc5THnMthp3PSaoOQkcoyIdFn99/VG5WKVY9JOpjqtV2NXS99d8r1mlilg6Hw+/Cz0Bc22DxDFa7ehw4W9BjGcTGTCFzMGdpp6is2IOKCVq1RVWvRP8hqg/rKV2EcvT0MmKi4Ew2UtxZMDje1sVWNpZmI1G2Ddrz4Z/cZ4qpUf93VL6/FPt5v/Zh2x6fyDlHXXStXjwkrSx1EqN3rZ2V3d893m3goJPUdKuwUfL4ijv88SUt3ptbofnOM6IkW4mhdtN67dqgicDGTCFx0PLUfFX6qzhQKu/fc2nJRWx0+YVuccVVXdM/luApcz1cITs0nWq6iUNJtYVVWHodMnlEr9U4+kGTLt9ZXz1SUxXPf25X6vn6SlN5f3BIgv2QnKvwO01TtcSaC0x2W/33rxAVpKnMdvJSXh31ugJlE4KKjqQL1Y4ca79MfaC0d0h9ghVRcSDTaczkU9/juSovXrxftBEdtN0CybPqhVryv8vUdNjsu75cK+SVLfvJVuJ1mPdr/WuuX/Zpstn3ETCFw0TG0o9DZfxt17UZfAZVPqr6kJlzrTUZSNex3VJJmTyYQpTb2JbVVbat1trU19Z34GcFpJnJpadVbh4ar/w3qHbCk4ZcK+dMa+gOotFV9q89UBDSLwEVHULv2xR/fmhyk8cu+/7LEBUSaiiY6U1mVU9xJCuopVf9fWbkNe821sv0kH1XXsy1w/U5VjSpKPzYebgISNwktC31/4dmI/HIp16HIUDH73a16exnDxcwhcNERVMX0Lrq7XM30LY1dZxsnbgJV3LKgOK5FeeFi5YQGN12oanML/zw+eBT+Givus4GVds/hLMpjkynX9mQUbnARN+FJE6+0n7IOVMKz/Cgc/4f9Dqd7cDF6oTzu6pcE+X2ts66r1UFXq7oVQLMIXHSMbVs3pRrTC0NCoekDUqGooE07xjcxcd1tExkKw1VbDipweiNrRbVmVdcV5pevm+6mDGqx+jZrK5VPhfeB+13VpA9PXT9ydtRV7hojrz3t4Dw3Ca3Zqlbjvlo+5f87+s/VF/lvott1sFPeRONOt4Vlo7W2hC1mGoGLjtEobNV29ieUD0NCQbKuic02VEmrGtZaUO2MpSpM61EbVcaqBONOQpBmj+TY95Fy8lDUydPn6t6uENNnu2GDNRy71fVH7cFKeKDQX6nev2a/w+mclUdhGz14UIjH7autSVTDew9Ovb5DJqqh8xC4mDMUBAW3CcLN6qYMacd44+gP+3MZT+ouK93a0VL1rEI6sbv2FM4aVH4vYbcFZBPLgnzgqmKNCym9H51lRwcI4e1uty77vWlnMIWslgmlXcvbiD8TUbXr0LOgup43Sv8tNXRQrHwPohBem/MGKkBaXaVSqWSAOUQVVLhL0mzld7QqFJo71+t0Hw8gkxKBCwBA+5XuMAAAoO0IXAAAckDgAgCQAwIXAIAcELgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkAMCFwCAHBC4AADkgMAFACAHnIAesK5cKZ8b9q67WnMi9ajxS5fN2Phld+7ZVe4E9ADmGipcdJSTp86a4fc+Trz9LzcmzY3iZM11E1evmxd//Lq76Pcpj4ncvxkK2wOH3jW/ff8jA2BuosJFxxi79IULNZm4es1s2fxkze0K46F3PjCDAyvNxg2PVK8vFOZVf+9ZuGDKY4ZtSK59eLVZt+aBmtsU3KWSMd22ak1Lr6XHpKHn7+rK9vwAbl8ELjrG4kX3upA98Pa75uTpszY87zTrH3+wentPzwIbYjfN0ROnzeDqFaZ30T3u+nqBprBV1dvdPW/KbeO2at2996DJYvTTz8227+9Kff/1jz1oP8NDBsDsR+CiowwOrHA/FbrDlfatD93++5faSvUBc+zEJ+bwkQ/Nju3P1H0uVbcKW1W9/nmj7opUxACQhMBFx1E4qqWssVyFbn/fEhe2omrxD7b6Hf30orv466Pc46uBHV9h9vctNa+89LwBgDQIXHSk9Y89ZEYvfG7G7bhu2DLW72sfHrBh+rEL5B3b4wNXt6m67b9/SWJ1G3Xs+Glz5tyomQ69ltrdADoPgYuO9dzWp81VG5p+rNZbu2bAtpVP299KbmJSdAxX1e0FW/12F+bZMeFvmLTGLl12VbNoslMWfiKVAh5AZyJw0bEUpN2L5sdev2P7s1OC2NNkK7WK/fhtVs1MdPITvQB0LgIXc4ImQCnQtPFEd2Fe4v0UfHE0u7loq+F1th29MsXGFSlX/gCYQwhc3DbGxi6b4uSkm4zUamoT+3ZvPY2qzMGB5aYRtatPnj5nsigWiwZAZyNwcVvYvedgNRDV6tWSnawbPpw5d94Ub9yccv3i3nvMqhXLYoNcbeOhIx+4CtbT2G/Sa6vdnETrfJsfg/1r9/+7u9nkAuhUBC5mnNq9YfWpfYd13bo1AyaLkbOjsRWqwjtp+c++/UM1YSvHjn/ScI1uHM2MNo8ZAIhF4GLGaUvGqLg9jRtRBRuO0aq1Gw3TkJb+aBmPluL4oPa/Dx35sGb7xzia4azKvF1bL+r5m6n0AdyeCFzMOLV7tftTSG3grNwa1qAoVnAmBa7WzGpjC81C1oxiH7gKWVXb2v5R4R1uDRmlIFQ1LlmXAdUT7rVM2AKdg8DFjFO7V0F38tSImbQB+XXbSk672UQzFLaH3/nQ/a69l8OlPwq4bVs32sr11y6QNTP5afveGuXpG/+807SKqvudL+81ADoLgYvbgpbb6NJufrtHUcjHje1q0tZzNnQ1vqtKV5OxfvD8M+aunvrnyp2YuOaq00L3/MyVqdrHxRuTpvsrVLRApyJwMSdoWdCBt4erk7PUKq4X8ApibY6hSlcV565/etNNioqeoi904NBwqqVH9WiWc5bdrQDMHgQu5oQwbLdsXu/OiduIKt2dL3ynGro6l+7i3rtrqmLtKuWpNV1vWZCew53qrzCv7i5XOmeuf964rScBzE4ELuYEra1Vi3jThkcTwy6OQlSV7vB75TZ0tAUdbuEYPeF9lJ5DJ01YuXxZw/tyDlyg8xC46Ej+XLYyeuFitUUcR1Vk+Hu0olToKiDD+wFAVncYoMNoFvKBQ7f2RD564hMzNn458f4a39WyHl2Kddbt0toFMB1UuOgYVyaumbcO1U6M0pioTkiw65/2u6VGax8aML1a49tlqkt9Fi+6N3ZZTynyD81CLk7edFs4Er4AsiJw0TF+YkPVb3QRToxSBavlQNrcwm9woSBudOq9cLcrPUf5cQvMrpeeN42o/Txx5bqbANVTWU7UzO5ZADoHgYuOoclIqm61cUU4MUrLeRS+mrSkE8tPfHndBagP0Sx6bTWc1q6f7Y+9vkB1DMxJXaVSiVN3oiP4CrJR5arq02/JGF6n8VtVpHHtYl2n28p7NacLzDf2D5lLkdfRgcDGDY82dWJ7ALNaicAFAKD9SsxSBgAgBwQuAAA5IHABAMgBgQsAQA4IXAAAckDgAgCQAwIXAIAcELgAAOSAwAUAIAcELgAAOSBwAQDIAYELAEAOCFwAAHJA4AIAkAMCFwCAHPyVAeYofybori7TVmfOjprxS1+Y3kX3mlUr+k0e9Joj586737dsftIAmHkELuakG8VJs+Mffu5+37Z1o1m5vH1BeOzEaTP66UUzOLAit8At2s938vRZ07NwgWmlsfHLpjB/nmlWsXjTLF58jwHmIgIXc1J3YX7190Kh+QAJuYo5Ui1PTFxzYavge+Lxh0ypzuPTFNp6voUL7zRp6XVLpXT3LU5O1nwvcfa9OWQmrl43zSrY53/tpz80wFxE4AIt8sP/9TMbKIWa64rFYuXnpHltz8G6j+9ddI+ttp+ue583bOCNX/qzSWv008/Ntu/vSnXf/vuXmB3bn617nx4b9grcbnuQ0iicQ+oo3LDVbXeLDm6A2YjABVpEgaKLguuWv274OAWYLrWPi9ddCfTeRXdnCrx6FIZZQlzWPjxg1tuKPa3RCxfN7r0HDTCXEbhAHRNXr5mTp87ZcHkw9WMaVYlRw+99ZIbf/zjTYzZteNQG9NIpz6Pg1lhxf1/tbSdPnXWt7ZXLl00ZR9ZtBw69awC0F4GLOU/joiYSXt7wex+7yUdjly6bLZvXp6oqFXxZqO2blSYfRcdmFbZ6r6qUS6WlkduuVSdRRSeIqd0NoP0IXHQUVWv1aNJOtMIbs+3UwZj7+rCVxb3pW7hZq9UsFJh32csb+4cS73Pg0LC7mIT3Fn1/GlfVc0bHnwG0FoGLjjL8/kcNZ9FufOpRs27NA9V/K1TVMg4D9djx0+65ZO0aO175WPrxyl0vfddkcfT4J27pUBp+Ta0CV5VpuOxHlbI+uyrY6OQkHVSM2ypdE7MW2/FfKbox50m3PnjThkdMFvrOslTmN6iiAQIXnaXHVWrxM2gVOJrUpPZqSME1cnbUDK5e4f6tKvnwOx+633XdpqeyhdHERLZlM820dLV2OOrA2++6IFxnDxDixnf1+VfZMM4y2SmJn+gFID0CF7eNsbHLbi1odMJPFkkTlsKNLuI2n1A1q3BVG9lXtvr3lm9l36Upj9m4mvUb3dhC48ziJkjZ22vuX6lG9TMcY06aZJXkRmWZk2YpZ9nEQxtmDFUOYoC5isDFbWH3noNuFq2o7blj+zMtW/YiqmBFARWt/hQ4Cq/wPajFnKWNHFr/WPoZzaGenvQbWvgJUnGSrhd9Pv8ZvfJypHSBqza0qC3df3+GA6OUm28AnYzAxYzzS1Y8tT51nVqjLXuNSgjFhYReR/sO+/ew0Y5nrnu4+dd+Yhot21LkH0n7PK+01eWuvtqx4sNHPrSfY9S1m3sr47SeHydWZRqOX0uhhQc2AJIRuJhxY5e+mHJdK8cHNWZ7q3KND0MFkWbvap3qdMJWXnz5ddMK2qVq5wvfqbaN1RbXUiBV/oX55UvIdwQ0hr3wb+6M3Dav+jN6m+h59fwK+HqdBf/fJUs1DqCMwMWMW7Vima2+Pqm5bnFv6za417isqHUct5m/gkYzkVUBqtJVNRitArPoalH/tDh5s+bf5ZnTjZcc7a6zhWTcsqCQ2uFJByXhTGOtXb5yZ/oTIzBLGSBwcRtQm1dt3JOnRsykHSP8ug0/hWMrqDXt28n1ZueqqlMreMi2ZTVpqr9viR2nbC70X3npedMO3d3zE7d/9DOwVcH2JrxvP3FKBx1JZxHSayQJZ3cnrfMFkIzAxW1BbdzptnKjFBDVGccJ1W30PWhyldrP+/YPmR9sf8bctTB767TR5htpKfR7gtdX23ttzHd0xX5O38Z+zo7fJk1mOnzkg2on4X/a+30l49htuNwp6zmES0yaAghcdC5VqxpzVNCmXXuqjSV27/m1e5zO7tNM6LZqX2LN1O5p8NpabqNT5olmVits1VIub+G4zPTZivgrlapV+y9rlrEq/p+8uj/zZxuvLDtS5b/zha0mC05eABC46FAatz1zrrwUSGGb9kTsup9m+YahqxCutwTGF29+FyjPr5VVizfLjGttYCGNlkVpTNdv0OGXMWkM+sK/a+nPrZnZCl5V+JrZvLGyo5Ru02fTY762ekWqc/H6lnTvIk4gDzSDwEXHCTevUBBlHQ8urwN+thq6uyvB9IR9rmgwaTLQrlffdL+XK9Ig2EvlYNO4avQ9KCyP2vautmGMbqvoA3dhwkGCglwTn+KWMSlcf/5/fuhuU3v87L+ddyGsi97bRlvl6sCgp2eB+55Ujeu7csFr32NSqzic6T2djUmAuYzARcdQ+L1lw8pXttopqtnNK3pd2/Q71dBVKJ08PeKez28BKapCo1tFplGoPC66raNfIqXboxWuQlqfzQefr8YVzKVgza4et0qn4bMXY550of/b9z6yY73Xq6+nz6GqXd+XrlfwDr3zgQvsaKUuoxdu7ZscPdsQgHQIXHQMH0jS7LaMIQWaKt3XbOheqewdPPFlcrhqqUzpP27NDvLhpnHTK1em7t8c/xzliUl3xVS3VypVpipmLWPSBCqFqypiVbA6CYEOFBSk4ditqmu/m1ZYaet+mlEdBnJvzHIsHciEk8+62SgDaAqBi47hJkZ1Gbc8JusJB5IodBVK7ixENgzrVcxJk4K0x/GLP063GUa4vWWUJj1p2Y4PWk+Vsqpbv22jP/OQD1+dsKDPtoGTWutJgeyp9ew3vGjFiQ+AuYrARUdJCkS/fWTayVNpnzek7RSzVn9qHeukDdodSpXwSKVCTxonjXsf/oQNCkW1pDV2q5+aVayLAtjvIa1AVfjGDdUmha0P8DRLq8rv45o5fOR31dMAip/hTHWMuYzAxZygQEva1H86s27VbvXt321bN2UOdLXBd/1sf811eo5mNv7wG1qUx27LAayDDG0oohnG+vz+DEN6/jTV6nhlTDnL0iodRFz49DPX5o5ihjPmsq5SqfSl/cnGqOhobhzSVmvFyunlvMHVK7Od9abFVIn69cI6KNAa1/WPP9x0JZ7Eh69OzaffNTEqbahrw4x1a1Znek86kIjukb249143E5oqF3PUlwrcP9pfVhkAc4KCdyYPMoA56o932P83YgDMGYQtMCPOKHCPGwAA0C5aL3hcLWWN3/7JMI4LAEA7KHAX3tHV1aUV+QcMAABoh18pa91yPFvl3mfKVS4AAGgdVbdftYH7mcZwjX6xP/7ZAACAVlHY/qKSsbc2nKmM5f5fe/lbAwAApuv/2ct/rQzdmjv8tZUr1hpaywAATJeydJ0PW7kjvLVS9m4whC4AAM1Shm7wrWQv9nTTlUlUxwztZQAA0tKYra9sP4veeEfcIyp3/DtTnkhVMgAAoB43QcqUx2w/i7tDV8NnKFe7L9nLlrSPAQBgDlDI+r0sfpEUtF7q8KzMYv6mvTxsLyvt5T7D7lQAgLlFAfuZvZyxlxP28i/hxKh6/hPzLo+qTNT+6gAAAABJRU5ErkJggg==" />
    );
  },
  title: 'トグル',
  description: 'コンテンツを隠したり、表示したりすることができます',
};
export default toolbox;
