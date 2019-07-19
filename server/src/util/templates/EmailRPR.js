export const EmailRPR = (type, content) => {
	if (type ==='text'){
		return(
			`
			${content.user.first_name || "friend"}
			Reset your password: ${content.link}
			`
		)
	}

	return(
		`<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>Reset Password Request</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width">
			<style type="text/css">@media only screen and (max-width:600px){body[yahoo=fix] .wrapper-inner{width:100%!important;margin:0!important;padding:0!important;-webkit-text-size-adjust:none}body[yahoo=fix] img{max-width:100%;height:auto!important}body[yahoo=fix] .content{font-size:15px;padding-top:1em;padding-bottom:1em;margin:0 20px}body[yahoo=fix] .footer{width:100%!important;padding:0!important}body[yahoo=fix] .footer .unsub{width:70%!important}body[yahoo=fix] .footer .social{width:15%!important}body[yahoo=fix] .footer .social a{padding:.5em;display:block}body[yahoo=fix] .footer .social a img{display:block;margin:0 auto}body[yahoo=fix] .footer p{font-size:12px!important;line-height:1.4!important;padding-left:3%}body[yahoo=fix] .spacer{display:none}}@media only screen and (max-width:480px){table[class=footer] p{padding-left:0;text-align:center}table[class=footer] td{display:block!important}table[class=footer] .unsub{width:100%!important}table[class=footer] .gutter{display:none!important}table[class=footer] .social{width:50%!important;float:left;text-align:center}table[class=content] .half-width-button{display:none!important;height:0!important;width:0!important}}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}p{margin:1em 0};
			</style>
		</head>
		<body style="min-width: 100%; margin: 0; padding: 0; font-family: sans-serif; line-height: 1.4; font-size: 15px; background: #ffffff" yahoo="fix">
		<table style="max-width:900px;margin:0px auto" width="95%">
			<tbody>
				<tr>
					<td>
					<div style="max-width: 700px; width: 95%; margin: 0 auto; font-family: sans-serif; font-size: 18px; line-height: 23.8px; color: #2c2b2c;  padding: 7px 7px 7px 7px;">
				
						<p> Hey ${content.user.first_names || "friend"}</p>
						<p> <a href=${content.link}> Reset your password </a></p>
		
					</div>
					</td>
				</tr>
			</tbody>
		</table>
		</body>
		</html>`
	)
}
