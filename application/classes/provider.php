<?php defined('SYSPATH') or die('No direct access allowed.');

class Provider {

	/**
	 * Create a provider.
	 * @param string $provider_name
	 * @return Provider
	 */
	public static function factory($provider_name)
	{
		$provider = null;
		$providers = Kohana::config('useradmin.providers');
		if (! empty($provider_name) && isset($providers[$provider_name]) && $providers[$provider_name])
		{
			switch ($provider_name)
			{
				case 'riverid':
					$provider = new Provider_RiverID();
				break;
				case 'facebook':
					$provider = new Provider_Facebook();
				break;
				case 'twitter':
					$provider = new Provider_Twitter();
				break;
				case 'google':
					$provider = new Provider_OpenID('google');
				break;
				case 'yahoo':
					$provider = new Provider_OpenID('yahoo');
				break;
			}
		}
		return $provider;
	}

	/**
	 * Get the URL to redirect to.
	 * @return string
	 */
	public function redirect_url($return_url);

	/**
	 * Verify the login result and do whatever is needed to access the user data from this provider.
	 * @return bool
	 */
	public function verify();

	/**
	 * Attempt to get the provider user ID.
	 * @return mixed
	 */
	public function user_id();

	/**
	 * Attempt to get the email from the provider (e.g. for finding an existing account to associate with).
	 * @return string
	 */
	public function email();

	/**
	 * Get the full name (firstname surname) from the provider.
	 * @return string
	 */
	public function name();
}